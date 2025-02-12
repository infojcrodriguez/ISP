import { getFacturaById } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function FacturaPage({ params }: { params: { id: string } }) {
  const factura = await getFacturaById(Number.parseInt(params.id))

  if (!factura) {
    return <div>Factura no encontrada</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Detalles de Factura</h1>
      <Card>
        <CardHeader>
          <CardTitle>Factura #{factura.numero}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{factura.cliente}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha de Emisión:</p>
              <p>{new Date(factura.fecha_emision).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Total:</p>
              <p>${factura.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <p>{factura.estado}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

