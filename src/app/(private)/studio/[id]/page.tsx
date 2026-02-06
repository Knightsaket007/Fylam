"use client";

import dynamic from "next/dynamic";

const StudioCanvas = dynamic(
  () => import("./StudioCanvas"),
  { ssr: false }
);

export default function StudioClient() {
  return <StudioCanvas />;
}
