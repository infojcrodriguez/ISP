"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createContract, updateContract } from "@/lib/actions"
import { getClients, getPlans } from "@/lib/data"

const contractSchema = z.object({
  id_cliente: z.string().min(1, { message: "El cliente es requerido." }),
  id_plan: z.string().min(1, { message: "El plan es requerido." }),
  fecha_inicio: z.string().min(1, { message: "La fecha de inicio es requerida." }),
  fecha_fin: z.string().optional(),
  estado: z.enum(["activo", "inactivo", "suspendido"]),
})

export function ContractForm({ contract }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState([])
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const clientsData = await getClients()
      const plansData = await getPlans()
      setClients(clientsData)
      setPlans(plansData)
    }
    fetchData()
  }, [])

  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: contract || {
      id_cliente: "",
      id_plan: "",
      fecha_inicio: new Date().toISOString().split("T")[0],
      fecha_fin: "",
      estado: "activo",
    },
  })

  async function onSubmit(values: z.infer<typeof contractSchema>) {
    setIsLoading(true)
    if (contract) {
      await updateContract(contract.id_contrato, values)
    } else {
      await createContract(values)
    }
    setIsLoading(false)
    router.push("/dashboard/contratos")
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
          name="id_plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id_plan} value={plan.id_plan.toString()}>
                      {plan.nombre}
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
          name="fecha_inicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Inicio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Fin (opcional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
                  <SelectItem value="suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : contract ? "Actualizar Contrato" : "Crear Contrato"}
        </Button>
      </form>
    </Form>
  )
}

