import { PrecintoList } from "./precinto-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PrecintosPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Precintos</h1>
        <Link href="/dashboard/fibra-optica/precintos/nuevo">
          <Button>Nuevo Precinto</Button>
        </Link>
      </div>
      <PrecintoList />
    </div>
  )
}

