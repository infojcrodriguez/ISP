import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function FibraOpticaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Fibra Óptica</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/fibra-optica/olts">
          <Card>
            <CardHeader>
              <CardTitle>OLTs</CardTitle>
            </CardHeader>
            <CardContent>Gestión de Optical Line Terminals</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/fibra-optica/naps">
          <Card>
            <CardHeader>
              <CardTitle>NAPs</CardTitle>
            </CardHeader>
            <CardContent>Gestión de Network Access Points</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/fibra-optica/precintos">
          <Card>
            <CardHeader>
              <CardTitle>Precintos</CardTitle>
            </CardHeader>
            <CardContent>Gestión de precintos de fibra óptica</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/fibra-optica/onts">
          <Card>
            <CardHeader>
              <CardTitle>ONTs</CardTitle>
            </CardHeader>
            <CardContent>ONTs autorizadas sin contrato</CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

