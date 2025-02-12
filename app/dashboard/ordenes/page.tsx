import { OrderList } from "./order-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function OrdenesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Órdenes de Trabajo</h1>
        <Link href="/dashboard/ordenes/nuevo">
          <Button>Nueva Orden</Button>
        </Link>
      </div>
      <OrderList />
    </div>
  )
}

