import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Package,
  Server,
  Network,
  CreditCard,
  LifeBuoy,
  ClipboardList,
  Box,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import React, { useState } from "react"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/contratos", label: "Contratos", icon: FileText },
  { href: "/dashboard/planes", label: "Planes", icon: Package },
  { href: "/dashboard/servidores", label: "Servidores", icon: Server },
  {
    href: "/dashboard/fibra-optica",
    label: "Fibra Óptica",
    icon: Network,
    subItems: [
      { href: "/dashboard/fibra-optica/olts", label: "OLTs" },
      { href: "/dashboard/fibra-optica/naps", label: "NAPs" },
      { href: "/dashboard/fibra-optica/precintos", label: "Precintos" },
      { href: "/dashboard/fibra-optica/onts", label: "ONTs autorizadas sin contrato" },
    ],
  },
  {
    href: "/dashboard/facturacion",
    label: "Facturación",
    icon: CreditCard,
    subItems: [
      { href: "/dashboard/facturacion/parametros", label: "Parámetros" },
      { href: "/dashboard/facturacion/razones-sociales", label: "Razones Sociales" },
      { href: "/dashboard/facturacion/borradores", label: "Borradores" },
      { href: "/dashboard/facturacion/emitidas", label: "Emitidas" },
      { href: "/dashboard/facturacion/notas-credito", label: "Notas de crédito" },
      { href: "/dashboard/facturacion/pagos", label: "Pagos" },
      { href: "/dashboard/facturacion/promesas-pago", label: "Promesas de pago" },
      { href: "/dashboard/facturacion/comprobantes", label: "Comprobantes de Pago" },
      { href: "/dashboard/facturacion/notificaciones", label: "Notificaciones" },
      { href: "/dashboard/facturacion/arqueos", label: "Arqueos de caja" },
    ],
  },
  { href: "/dashboard/mesa-ayuda", label: "Mesa de Ayuda", icon: LifeBuoy },
  {
    href: "/dashboard/ordenes",
    label: "Órdenes",
    icon: ClipboardList,
    subItems: [
      { href: "/dashboard/ordenes/listado", label: "Órdenes" },
      { href: "/dashboard/ordenes/tipos-feedback", label: "Tipos de feedback" },
      { href: "/dashboard/ordenes/calendario", label: "Calendario" },
      { href: "/dashboard/ordenes/configuracion", label: "Configuración" },
    ],
  },
  {
    href: "/dashboard/inventario",
    label: "Inventario",
    icon: Box,
    subItems: [
      { href: "/dashboard/inventario/stocks", label: "Stocks" },
      { href: "/dashboard/inventario/articulos", label: "Artículos" },
      { href: "/dashboard/inventario/almacenes", label: "Almacenes" },
      { href: "/dashboard/inventario/distribuidores", label: "Distribuidores" },
      { href: "/dashboard/inventario/nodos", label: "Nodos" },
    ],
  },
  {
    href: "/dashboard/notificaciones",
    label: "Notificaciones",
    icon: Bell,
    subItems: [
      { href: "/dashboard/notificaciones/dispositivo", label: "Dispositivo" },
      { href: "/dashboard/notificaciones/manuales", label: "Manuales" },
      { href: "/dashboard/notificaciones/email", label: "Email" },
      { href: "/dashboard/notificaciones/smtp", label: "Configuraciones de SMTP" },
      { href: "/dashboard/notificaciones/sms", label: "SMS" },
      { href: "/dashboard/notificaciones/sms-enviados", label: "SMS Enviados" },
    ],
  },
  {
    href: "/dashboard/configuracion",
    label: "Configuración",
    icon: Settings,
    subItems: [
      { href: "/dashboard/configuracion/empleados", label: "Empleados" },
      { href: "/dashboard/configuracion/auditorias", label: "Auditorías" },
      { href: "/dashboard/configuracion/isp", label: "ISP" },
      { href: "/dashboard/configuracion/portal-clientes", label: "Portal de Clientes" },
      { href: "/dashboard/configuracion/zonas", label: "Zonas" },
      { href: "/dashboard/configuracion/barrios", label: "Barrios" },
    ],
  },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({})

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [href]: !prev[href] }))
  }

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {menuItems.map((item) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
            onClick={() => item.subItems && toggleSubmenu(item.href)}
          >
            <span className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </span>
            {item.subItems &&
              (openSubmenus[item.href] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </Link>
          {item.subItems && openSubmenus[item.href] && (
            <div className="ml-6 mt-1 space-y-1">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
                    pathname === subItem.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

