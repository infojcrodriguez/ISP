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
import { createOLT, updateOLT } from "@/lib/actions"

const oltSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  ip: z.string().ip({ message: "Debe ser una dirección IP válida." }),
  ubicacion: z.string().min(1, { message: "La ubicación es requerida." }),
  estado: z.enum(["activo", "mantenimiento", "inactivo"]),
})

export function OLTForm({ olt }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof oltSchema>>({
    resolver: zodResolver(oltSchema),
    defaultValues: olt || {
      nombre: "",
      ip: "",
      ubicacion: "",
      estado: "activo",
    },
  })

  async function onSubmit(values: z.infer<typeof oltSchema>) {
    setIsLoading(true)
    if (olt) {
      await updateOLT(olt.id_olt, values)
    } else {
      await createOLT(values)
    }
    setIsLoading(false)
    router.push("/dashboard/fibra-optica/olts")
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
              <FormLabel>Nombre de la OLT</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección IP</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ubicacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input {...field} />
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
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : olt ? "Actualizar OLT" : "Crear OLT"}
        </Button>
      </form>
    </Form>
  )
}

