"use client"

import Navbar from "@/comman/navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { StudioProvider, useStudio } from "./context/StudioContext";
import { getLastFieldId } from "@/utils/studio/getLastField";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar/Sidebar"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>

      <StudioProvider>
        <SubLayout >{children}</SubLayout>
      </StudioProvider>
    </>
  )
}


export const SubLayout = ({ children }: { children: React.ReactNode; }) => {

  const { fields, activeField, setActiveField } = useStudio();

  return (

    <TooltipProvider>
      <Navbar />

      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-64px)]">

          <AppSidebar />

          <main className="flex-1">
            <SidebarTrigger />

            <section
              className="min-h-screen w-full  px-4 py-10"
              onClick={() => {
                const value = getLastFieldId(fields);
                setActiveField(value);
              }}
            >
              <div className="mx-auto">
                {children}
              </div>
            </section>

          </main>

        </div>
      </SidebarProvider>
    </TooltipProvider>

  )

}