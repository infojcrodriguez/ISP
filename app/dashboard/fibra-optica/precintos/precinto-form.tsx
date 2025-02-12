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
import { createPrecinto, updatePrecinto } from "@/lib/actions"

const precintoSchema = z.object({
  codigo: z.string().min(1, { message: "El código es requerido." }),
  tipo: z.enum(["fibra", "caja", "poste"]),
  estado: z.enum(["nuevo", "usado", "dañado"]),
  ubicacion: z.string().min(1, { message: "La ubicación es requerida." }),
})

export function PrecintoForm({ precinto }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof precintoSchema>>({
    resolver: zodResolver(precintoSchema),
    defaultValues: precinto || {
      codigo: "",
      tipo: "fibra",
      estado: "nuevo",
      ubicacion: "",
    },
  })

  async function onSubmit(values: z.infer<typeof precintoSchema>) {
    setIsLoading(true)
    if (precinto) {
      await updatePrecinto(precinto.id_precinto, values)
    } else {
      await createPrecinto(values)
    }
    setIsLoading(false)
    router.push("/dashboard/fibra-optica/precintos")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código del Precinto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fibra">Fibra</SelectItem>
                  <SelectItem value="caja">Caja</SelectItem>
                  <SelectItem value="poste">Poste</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="usado">Usado</SelectItem>
                  <SelectItem value="dañado">Dañado</SelectItem>
                </SelectContent>
              </Select>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : precinto ? "Actualizar Precinto" : "Crear Precinto"}
        </Button>
      </form>
    </Form>
  )
}

