"use client"

import Navbar from "@/comman/navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { StudioProvider, useStudio } from "./context/StudioContext";
import { getLastFieldId } from "@/utils/studio/getLastField";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar/AppSidebar"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <StudioProvider>

      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {/* {children} */}
        </main>
      </SidebarProvider>

      <SubLayout >{children}</SubLayout>
    </StudioProvider>
  )
}


export const SubLayout = ({ children }: { children: React.ReactNode; }) => {

  const { fields, activeField, setActiveField } = useStudio();

  return (

    <TooltipProvider>
      <Navbar />

      <section className="min-h-screen w-full bg-gray-50 px-4 py-10"

        onClick={() => {
          const value = getLastFieldId(fields);
          // if (lastId) setActiveId(lastId);
          setActiveField(value)

          console.log("click and last field id", value.maxY)
          console.log("click and last field id", value.lastText)
        }}
      >
        <div className="mx-auto">
          {children}
        </div>
      </section>
    </TooltipProvider>

  )

}