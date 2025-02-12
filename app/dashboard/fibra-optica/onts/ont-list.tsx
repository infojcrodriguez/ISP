import { getONTs } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function ONTList() {
  const onts = await getONTs()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>MAC</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {onts.map((ont) => (
          <TableRow key={ont.id_ont}>
            <TableCell>{ont.serial}</TableCell>
            <TableCell>{ont.modelo}</TableCell>
            <TableCell>{ont.mac}</TableCell>
            <TableCell>{ont.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/fibra-optica/onts/${ont.id_ont}`}>
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

