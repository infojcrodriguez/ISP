"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createONT, updateONT } from "@/lib/actions"

const ontSchema = z.object({
  serial: z.string().min(1, { message: "El número de serie es requerido." }),
  modelo: z.string().min(1, { message: "El modelo es requerido." }),
  mac: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, { message: "Dirección MAC inválida." }),
  estado: z.enum(["activa", "inactiva", "pendiente"]),
})

export function ONTForm({ ont }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof ontSchema>>({
    resolver: zodResolver(ontSchema),
    defaultValues: ont || {
      serial: "",
      modelo: "",
      mac: "",
      estado: "pendiente",
    },
  })

  async function onSubmit(values: z.infer<typeof ontSchema>) {
    setIsLoading(true)
    if (ont) {
      await updateONT(ont.id_ont, values)
    } else {
      await createONT(values)
    }
    setIsLoading(false)
    router.push("/dashboard/fibra-optica/onts")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="serial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Serie</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modelo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección MAC</FormLabel>
              <FormControl>
                <Input {...field} placeholder="00:11:22:33:44:55" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="inactiva">Inactiva</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : ont ? "Actualizar ONT" : "Crear ONT"}
        </Button>
      </form>
    </Form>
  )
}

