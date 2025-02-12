import { RazonesSocialesList } from "./razones-sociales-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function RazonesSocialesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Razones Sociales</h1>
        <Link href="/dashboard/facturacion/razones-sociales/nuevo">
          <Button>Nueva Razón Social</Button>
        </Link>
      </div>
      <RazonesSocialesList />
    </div>
  )
}

