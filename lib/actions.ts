"use server"

import { revalidatePath } from "next/cache"
import { query } from "./db"

export async function createClient(client) {
  try {
    await query(
      `INSERT INTO clientes (nombre, apellido, dni, email, telefono, direccion, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [client.nombre, client.apellido, client.dni, client.email, client.telefono, client.direccion, client.estado],
    )
    revalidatePath("/dashboard/clientes")
  } catch (error) {
    console.error("Database action error:", error)
    throw new Error("Failed to perform database action")
  }
}

// Actualiza las demás funciones de manera similar...

export async function updateClient(id, client) {
  try {
    await query(
      `UPDATE clientes
       SET nombre = ?, apellido = ?, dni = ?, email = ?, telefono = ?, direccion = ?, estado = ?
       WHERE id_cliente = ?`,
      [client.nombre, client.apellido, client.dni, client.email, client.telefono, client.direccion, client.estado, id],
    )
    revalidatePath("/dashboard/clientes")
  } catch (error) {
    console.error("Database action error:", error)
    throw new Error("Failed to perform database action")
  }
}

// Continúa actualizando las demás funciones...

