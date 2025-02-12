import { OLTList } from "./olt-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function OLTsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">OLTs</h1>
        <Link href="/dashboard/fibra-optica/olts/nuevo">
          <Button>Nueva OLT</Button>
        </Link>
      </div>
      <OLTList />
    </div>
  )
}

