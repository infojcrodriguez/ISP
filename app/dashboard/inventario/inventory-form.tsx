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
import { createInventoryItem, updateInventoryItem } from "@/lib/actions"

const inventoryItemSchema = z.object({
  codigo: z.string().min(1, { message: "El código es requerido." }),
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  categoria: z.string().min(1, { message: "La categoría es requerida." }),
  cantidad: z.number().min(0, { message: "La cantidad no puede ser negativa." }),
  ubicacion: z.string().min(1, { message: "La ubicación es requerida." }),
  estado: z.enum(["Disponible", "Agotado", "En mantenimiento"]),
})

export function InventoryForm({ item }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: item || {
      codigo: "",
      nombre: "",
      categoria: "",
      cantidad: 0,
      ubicacion: "",
      estado: "Disponible",
    },
  })

  async function onSubmit(values: z.infer<typeof inventoryItemSchema>) {
    setIsLoading(true)
    if (item) {
      await updateInventoryItem(item.id_articulo, values)
    } else {
      await createInventoryItem(values)
    }
    setIsLoading(false)
    router.push("/dashboard/inventario")
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
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
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
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Agotado">Agotado</SelectItem>
                  <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : item ? "Actualizar Artículo" : "Crear Artículo"}
        </Button>
      </form>
    </Form>
  )
}

