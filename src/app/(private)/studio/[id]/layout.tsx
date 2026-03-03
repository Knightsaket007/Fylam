"use client"

import Navbar from "@/comman/navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { StudioProvider } from "./context/StudioContext";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudioProvider>
      <TooltipProvider>
        <Navbar />

        <section className="min-h-screen w-full bg-gray-50 px-4 py-10">
          <div className="mx-auto">
            {children}
          </div>
        </section>
      </TooltipProvider>
    </StudioProvider>
  )
}