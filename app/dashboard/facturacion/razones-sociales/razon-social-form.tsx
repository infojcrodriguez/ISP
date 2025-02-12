"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRazonSocial, updateRazonSocial } from "@/lib/actions"

const razonSocialSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  ruc: z.string().min(11, { message: "El RUC debe tener al menos 11 caracteres." }),
  direccion: z.string().min(1, { message: "La dirección es requerida." }),
})

export function RazonSocialForm({ razonSocial }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof razonSocialSchema>>({
    resolver: zodResolver(razonSocialSchema),
    defaultValues: razonSocial || {
      nombre: "",
      ruc: "",
      direccion: "",
    },
  })

  async function onSubmit(values: z.infer<typeof razonSocialSchema>) {
    setIsLoading(true)
    if (razonSocial) {
      await updateRazonSocial(razonSocial.id_razon_social, values)
    } else {
      await createRazonSocial(values)
    }
    setIsLoading(false)
    router.push("/dashboard/facturacion/razones-sociales")
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
              <FormLabel>Nombre de la Razón Social</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ruc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RUC</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : razonSocial ? "Actualizar Razón Social" : "Crear Razón Social"}
        </Button>
      </form>
    </Form>
  )
}

