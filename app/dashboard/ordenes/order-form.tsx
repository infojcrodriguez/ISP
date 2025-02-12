"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createOrder, updateOrder } from "@/lib/actions"
import { getClients, getTechnicians } from "@/lib/data"

const orderSchema = z.object({
  id_cliente: z.string().min(1, { message: "El cliente es requerido." }),
  tipo: z.enum(["Instalación", "Reparación", "Mantenimiento"]),
  descripcion: z.string().min(1, { message: "La descripción es requerida." }),
  estado: z.enum(["Pendiente", "En Progreso", "Completada", "Cancelada"]),
  tecnico_asignado: z.string().min(1, { message: "El técnico asignado es requerido." }),
})

export function OrderForm({ order }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState([])
  const [technicians, setTechnicians] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const clientsData = await getClients()
      const techniciansData = await getTechnicians()
      setClients(clientsData)
      setTechnicians(techniciansData)
    }
    fetchData()
  }, [])

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: order || {
      id_cliente: "",
      tipo: "Instalación",
      descripcion: "",
      estado: "Pendiente",
      tecnico_asignado: "",
    },
  })

  async function onSubmit(values: z.infer<typeof orderSchema>) {
    setIsLoading(true)
    if (order) {
      await updateOrder(order.id_orden, values)
    } else {
      await createOrder(values)
    }
    setIsLoading(false)
    router.push("/dashboard/ordenes")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id_cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id_cliente} value={client.id_cliente.toString()}>
                      {client.nombre} {client.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Orden</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Instalación">Instalación</SelectItem>
                  <SelectItem value="Reparación">Reparación</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Completada">Completada</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tecnico_asignado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Técnico Asignado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un técnico" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {technicians.map((technician) => (
                    <SelectItem key={technician.id_tecnico} value={technician.id_tecnico.toString()}>
                      {technician.nombre} {technician.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : order ? "Actualizar Orden" : "Crear Orden"}
        </Button>
      </form>
    </Form>
  )
}

