import { NotificationList } from "./notification-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function NotificacionesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notificaciones</h1>
        <Link href="/dashboard/notificaciones/nuevo">
          <Button>Nueva Notificación</Button>
        </Link>
      </div>
      <NotificationList />
    </div>
  )
}

