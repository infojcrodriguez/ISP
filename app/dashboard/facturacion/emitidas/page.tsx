import { FacturasEmitidasList } from "./facturas-emitidas-list"

export default async function FacturasEmitidasPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Facturas Emitidas</h1>
      <FacturasEmitidasList />
    </div>
  )
}

