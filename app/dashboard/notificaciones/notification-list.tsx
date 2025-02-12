import { getNotifications } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export async function NotificationList() {
  const notifications = await getNotifications()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Destinatario</TableHead>
          <TableHead>Fecha de Envío</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications.map((notification) => (
          <TableRow key={notification.id_notificacion}>
            <TableCell>{notification.titulo}</TableCell>
            <TableCell>{notification.tipo}</TableCell>
            <TableCell>{notification.destinatario}</TableCell>
            <TableCell>{new Date(notification.fecha_envio).toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={notification.estado === "Enviada" ? "success" : "default"}>{notification.estado}</Badge>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/notificaciones/${notification.id_notificacion}`}>
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

