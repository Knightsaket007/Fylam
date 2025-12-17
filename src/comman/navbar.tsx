// "use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        
        <Link href="/dashboard" className="text-lg font-semibold">
          Fylam
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/forms/upload" className="hover:text-black">
            Upload
          </Link>

          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>

        
          <Button>Logout</Button>
        </nav>
      </div>
    </header>
  );
}
