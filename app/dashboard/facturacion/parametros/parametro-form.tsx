"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createParametro, updateParametro } from "@/lib/actions"

const parametroSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  valor: z.string().min(1, { message: "El valor es requerido." }),
  descripcion: z.string().optional(),
})

export function ParametroForm({ parametro }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof parametroSchema>>({
    resolver: zodResolver(parametroSchema),
    defaultValues: parametro || {
      nombre: "",
      valor: "",
      descripcion: "",
    },
  })

  async function onSubmit(values: z.infer<typeof parametroSchema>) {
    setIsLoading(true)
    if (parametro) {
      await updateParametro(parametro.id_parametro, values)
    } else {
      await createParametro(values)
    }
    setIsLoading(false)
    router.push("/dashboard/facturacion/parametros")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Parámetro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : parametro ? "Actualizar Parámetro" : "Crear Parámetro"}
        </Button>
      </form>
    </Form>
  )
}

