import { NAPList } from "./nap-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function NAPsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">NAPs</h1>
        <Link href="/dashboard/fibra-optica/naps/nuevo">
          <Button>Nuevo NAP</Button>
        </Link>
      </div>
      <NAPList />
    </div>
  )
}

