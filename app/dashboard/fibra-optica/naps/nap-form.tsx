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
import { createNAP, updateNAP } from "@/lib/actions"

const napSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  ubicacion: z.string().min(1, { message: "La ubicación es requerida." }),
  capacidad: z.number().min(1, { message: "La capacidad debe ser al menos 1." }),
  estado: z.enum(["activo", "mantenimiento", "inactivo"]),
})

export function NAPForm({ nap }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof napSchema>>({
    resolver: zodResolver(napSchema),
    defaultValues: nap || {
      nombre: "",
      ubicacion: "",
      capacidad: 1,
      estado: "activo",
    },
  })

  async function onSubmit(values: z.infer<typeof napSchema>) {
    setIsLoading(true)
    if (nap) {
      await updateNAP(nap.id_nap, values)
    } else {
      await createNAP(values)
    }
    setIsLoading(false)
    router.push("/dashboard/fibra-optica/naps")
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
              <FormLabel>Nombre del NAP</FormLabel>
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
          name="capacidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidad</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
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
          {isLoading ? "Guardando..." : nap ? "Actualizar NAP" : "Crear NAP"}
        </Button>
      </form>
    </Form>
  )
}

