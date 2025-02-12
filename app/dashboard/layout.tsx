import type React from "react"
import { MainNav } from "@/components/main-nav"
import { TopBar } from "@/components/top-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <aside className="w-64 bg-background border-r">
          <div className="p-4">
            <MainNav />
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

