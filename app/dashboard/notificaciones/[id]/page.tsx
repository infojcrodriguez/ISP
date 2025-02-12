import { getNotificationById } from "@/lib/data"
import { NotificationForm } from "../notification-form"

export default async function NotificationPage({ params }: { params: { id: string } }) {
  const notification = params.id === "nuevo" ? null : await getNotificationById(Number.parseInt(params.id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{notification ? "Detalles de Notificación" : "Nueva Notificación"}</h1>
      <NotificationForm notification={notification} />
    </div>
  )
}

