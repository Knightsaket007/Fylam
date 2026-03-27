"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Home, Settings, LayoutDashboard } from "lucide-react"

export function AppSidebar() {

  return (

      <Sidebar side="right" className="fixed top-[64px] right-0 h-[calc(100vh-64px)] z-40">


      <div className="absolute top-2 -left-4 bg-slate-200 rounded-[8px]">

        <SidebarTrigger size="icon-lg" />
      </div>

      {/* HEADER */}
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-2">Studio</h2>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>

        <SidebarGroup>
          <SidebarMenu className="mt-6">

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home className="w-4 h-4" />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard className="w-4 h-4" />
                Projects
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="w-4 h-4" />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <p className="text-xs text-muted-foreground px-2">
          © 2026 Studio
        </p>
      </SidebarFooter>

    </Sidebar>
  )
}