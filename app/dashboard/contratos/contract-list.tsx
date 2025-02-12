import { getContracts } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function ContractList() {
  const contracts = await getContracts()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID Cliente</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Fecha Inicio</TableHead>
          <TableHead>Fecha Fin</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.id_contrato}>
            <TableCell>{contract.id_cliente}</TableCell>
            <TableCell>{contract.nombre_plan}</TableCell>
            <TableCell>{new Date(contract.fecha_inicio).toLocaleDateString()}</TableCell>
            <TableCell>{contract.fecha_fin ? new Date(contract.fecha_fin).toLocaleDateString() : "N/A"}</TableCell>
            <TableCell>{contract.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/contratos/${contract.id_contrato}`}>
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

