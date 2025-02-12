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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPlan, updatePlan } from "@/lib/actions"

const planSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  velocidad_down: z.string().min(1, { message: "La velocidad de bajada es requerida." }),
  velocidad_up: z.string().min(1, { message: "La velocidad de subida es requerida." }),
  precio: z.string().min(1, { message: "El precio es requerido." }),
  descripcion: z.string().optional(),
  estado: z.enum(["activo", "inactivo"]),
})

export function PlanForm({ plan }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: plan || {
      nombre: "",
      velocidad_down: "",
      velocidad_up: "",
      precio: "",
      descripcion: "",
      estado: "activo",
    },
  })

  async function onSubmit(values: z.infer<typeof planSchema>) {
    setIsLoading(true)
    if (plan) {
      await updatePlan(plan.id_plan, values)
    } else {
      await createPlan(values)
    }
    setIsLoading(false)
    router.push("/dashboard/planes")
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
              <FormLabel>Nombre del Plan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="velocidad_down"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad de Bajada (Mbps)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="velocidad_up"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Velocidad de Subida (Mbps)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
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
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : plan ? "Actualizar Plan" : "Crear Plan"}
        </Button>
      </form>
    </Form>
  )
}

