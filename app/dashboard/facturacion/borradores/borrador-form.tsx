"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createBorrador, updateBorrador } from "@/lib/actions"

const borradorSchema = z.object({
  numero: z.string().min(1, { message: "El número es requerido." }),
  cliente: z.string().min(1, { message: "El cliente es requerido." }),
  fecha: z.string().min(1, { message: "La fecha es requerida." }),
  total: z.number().min(0, { message: "El total debe ser un número positivo." }),
})

export function BorradorForm({ borrador }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof borradorSchema>>({
    resolver: zodResolver(borradorSchema),
    defaultValues: borrador || {
      numero: "",
      cliente: "",
      fecha: new Date().toISOString().split("T")[0],
      total: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof borradorSchema>) {
    setIsLoading(true)
    if (borrador) {
      await updateBorrador(borrador.id_borrador, values)
    } else {
      await createBorrador(values)
    }
    setIsLoading(false)
    router.push("/dashboard/facturacion/borradores")
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
              <FormLabel>Número de Borrador</FormLabel>
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
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
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
          {isLoading ? "Guardando..." : borrador ? "Actualizar Borrador" : "Crear Borrador"}
        </Button>
      </form>
    </Form>
  )
}

