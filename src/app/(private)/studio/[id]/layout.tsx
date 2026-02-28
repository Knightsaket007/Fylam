"use client"

import Navbar from "@/comman/navbar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Navbar />

      <section className="min-h-screen w-full bg-gray-50 px-4 py-10">
        <div className="mx-auto">
          {children}
        </div>
      </section>
    </TooltipProvider>
  )
}