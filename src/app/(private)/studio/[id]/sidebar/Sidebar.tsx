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
} from "@/components/ui/sidebar"

import { Home, Settings, LayoutDashboard } from "lucide-react"

export function AppSidebar() {

  return (

    <Sidebar
      side="right"
      className="h-[calc(100vh-64px)]"   
      style={{
        "--sidebar-width": "24rem",    
      } as React.CSSProperties}
    >

 
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-2">Studio</h2>
      </SidebarHeader>

      
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


      <SidebarFooter>
        <p className="text-xs text-muted-foreground px-2">
          © 2026 Studio
        </p>
      </SidebarFooter>

    </Sidebar>
  )
}