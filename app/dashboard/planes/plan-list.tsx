import { getPlans } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function PlanList() {
  const plans = await getPlans()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Velocidad Bajada</TableHead>
          <TableHead>Velocidad Subida</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id_plan}>
            <TableCell>{plan.nombre}</TableCell>
            <TableCell>{plan.velocidad_down} Mbps</TableCell>
            <TableCell>{plan.velocidad_up} Mbps</TableCell>
            <TableCell>${plan.precio.toFixed(2)}</TableCell>
            <TableCell>{plan.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/planes/${plan.id_plan}`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

