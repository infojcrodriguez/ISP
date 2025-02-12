import { getInventoryItems } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export async function InventoryList() {
  const items = await getInventoryItems()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id_articulo}>
            <TableCell>{item.codigo}</TableCell>
            <TableCell>{item.nombre}</TableCell>
            <TableCell>{item.categoria}</TableCell>
            <TableCell>{item.cantidad}</TableCell>
            <TableCell>{item.ubicacion}</TableCell>
            <TableCell>
              <Badge variant={item.estado === "Disponible" ? "success" : "destructive"}>{item.estado}</Badge>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/inventario/${item.id_articulo}`}>
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

