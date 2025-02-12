import { getServers } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function ServerList() {
  const servers = await getServers()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>IP</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servers.map((server) => (
          <TableRow key={server.id_servidor}>
            <TableCell>{server.nombre}</TableCell>
            <TableCell>{server.ip}</TableCell>
            <TableCell>{server.ubicacion}</TableCell>
            <TableCell>{server.estado}</TableCell>
            <TableCell>
              <Link href={`/dashboard/servidores/${server.id_servidor}`}>
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

