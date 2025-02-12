import { ONTList } from "./ont-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ONTsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ONTs Autorizadas sin Contrato</h1>
        <Link href="/dashboard/fibra-optica/onts/nuevo">
          <Button>Nueva ONT</Button>
        </Link>
      </div>
      <ONTList />
    </div>
  )
}

