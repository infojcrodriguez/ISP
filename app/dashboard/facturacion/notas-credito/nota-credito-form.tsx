"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createNotaCredito, updateNotaCredito } from "@/lib/actions"

const notaCreditoSchema = z.object({
  numero: z.string().min(1, { message: "El número es requerido." }),
  factura_relacionada: z.string().min(1, { message: "La factura relacionada es requerida." }),
  cliente: z.string().min(1, { message: "El cliente es requerido." }),
  fecha: z.string().min(1, { message: "La fecha es requerida." }),
  monto: z.number().min(0, { message: "El monto debe ser un número positivo." }),
})

export function NotaCreditoForm({ notaCredito }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof notaCreditoSchema>>({
    resolver: zodResolver(notaCreditoSchema),
    defaultValues: notaCredito || {
      numero: "",
      factura_relacionada: "",
      cliente: "",
      fecha: new Date().toISOString().split("T")[0],
      monto: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof notaCreditoSchema>) {
    setIsLoading(true)
    if (notaCredito) {
      await updateNotaCredito(notaCredito.id_nota_credito, values)
    } else {
      await createNotaCredito(values)
    }
    setIsLoading(false)
    router.push("/dashboard/facturacion/notas-credito")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="numero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Nota de Crédito</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="factura_relacionada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Factura Relacionada</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : notaCredito ? "Actualizar Nota de Crédito" : "Crear Nota de Crédito"}
        </Button>
      </form>
    </Form>
  )
}

