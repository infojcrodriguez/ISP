import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function FacturacionPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Facturación</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/facturacion/parametros">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros</CardTitle>
            </CardHeader>
            <CardContent>Configuración de parámetros de facturación</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/facturacion/razones-sociales">
          <Card>
            <CardHeader>
              <CardTitle>Razones Sociales</CardTitle>
            </CardHeader>
            <CardContent>Gestión de razones sociales</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/facturacion/borradores">
          <Card>
            <CardHeader>
              <CardTitle>Borradores</CardTitle>
            </CardHeader>
            <CardContent>Gestión de borradores de facturas</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/facturacion/emitidas">
          <Card>
            <CardHeader>
              <CardTitle>Emitidas</CardTitle>
            </CardHeader>
            <CardContent>Facturas emitidas</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/facturacion/notas-credito">
          <Card>
            <CardHeader>
              <CardTitle>Notas de Crédito</CardTitle>
            </CardHeader>
            <CardContent>Gestión de notas de crédito</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/facturacion/pagos">
          <Card>
            <CardHeader>
              <CardTitle>Pagos</CardTitle>
            </CardHeader>
            <CardContent>Registro y gestión de pagos</CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

