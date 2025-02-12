import { PlanList } from "./plan-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PlanesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Planes de Internet</h1>
        <Link href="/dashboard/planes/nuevo">
          <Button>Nuevo Plan</Button>
        </Link>
      </div>
      <PlanList />
    </div>
  )
}

