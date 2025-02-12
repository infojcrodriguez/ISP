import { query } from "./db"

export async function getClients() {
  try {
    const results = await query("SELECT * FROM clientes ORDER BY fecha_registro DESC")
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Failed to fetch data from the database")
  }
}

export async function getClientById(id) {
  try {
    const results = await query("SELECT * FROM clientes WHERE id_cliente = ?", [id])
    return results[0]
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Failed to fetch data from the database")
  }
}

// Continúa actualizando las demás funciones...

export async function getDashboardData() {
  try {
    const activeClients = await query('SELECT COUNT(*) as count FROM clientes WHERE estado = "activo"')
    const newClientsThisMonth = await query(`
      SELECT COUNT(*) as count FROM clientes 
      WHERE estado = "activo" AND fecha_registro >= DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")
    `)
    const monthlyRevenue = await query(`
      SELECT SUM(monto) as sum FROM facturas 
      WHERE fecha_emision >= DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")
    `)
    const lastMonthRevenue = await query(`
      SELECT SUM(monto) as sum FROM facturas 
      WHERE fecha_emision >= DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), "%Y-%m-01")
      AND fecha_emision < DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")
    `)
    const activeTickets = await query('SELECT COUNT(*) as count FROM tickets WHERE estado != "Cerrado"')
    const ticketsClosedToday = await query(`
      SELECT COUNT(*) as count FROM tickets 
      WHERE estado = "Cerrado" AND fecha_cierre >= CURRENT_DATE
    `)
    const bandwidthUsage = await query(`
      SELECT (SUM(p.velocidad_down) * 100.0 / (SELECT SUM(capacidad) FROM olts)) as usage
      FROM contratos c
      JOIN planes p ON c.id_plan = p.id_plan
      WHERE c.estado = "activo"
    `)
    const revenueByPlan = await query(`
      SELECT p.nombre as name, SUM(f.monto) as revenue
      FROM facturas f
      JOIN contratos c ON f.id_contrato = c.id_contrato
      JOIN planes p ON c.id_plan = p.id_plan
      WHERE f.fecha_emision >= DATE_FORMAT(CURRENT_DATE, "%Y-%m-01")
      GROUP BY p.nombre
      ORDER BY revenue DESC
      LIMIT 5
    `)

    const revenueGrowth = ((monthlyRevenue[0].sum - lastMonthRevenue[0].sum) / lastMonthRevenue[0].sum) * 100

    return {
      activeClients: activeClients[0].count,
      newClientsThisMonth: newClientsThisMonth[0].count,
      monthlyRevenue: monthlyRevenue[0].sum,
      revenueGrowth: revenueGrowth.toFixed(2),
      activeTickets: activeTickets[0].count,
      ticketsClosedToday: ticketsClosedToday[0].count,
      bandwidthUsage: bandwidthUsage[0].usage.toFixed(2),
      revenueByPlan: revenueByPlan,
    }
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Failed to fetch dashboard data from the database")
  }
}

