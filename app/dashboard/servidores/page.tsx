import { ServerList } from "./server-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ServidoresPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Servidores</h1>
        <Link href="/dashboard/servidores/nuevo">
          <Button>Nuevo Servidor</Button>
        </Link>
      </div>
      <ServerList />
    </div>
  )
}

