import { getOrders } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export async function OrderList() {
  const orders = await getOrders()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha Creación</TableHead>
          <TableHead>Técnico Asignado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id_orden}>
            <TableCell>{order.id_orden}</TableCell>
            <TableCell>{order.nombre_cliente}</TableCell>
            <TableCell>{order.tipo}</TableCell>
            <TableCell>
              <Badge variant={order.estado === "Completada" ? "success" : "default"}>{order.estado}</Badge>
            </TableCell>
            <TableCell>{new Date(order.fecha_creacion).toLocaleString()}</TableCell>
            <TableCell>{order.tecnico_asignado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/ordenes/${order.id_orden}`}>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

