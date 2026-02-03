import Navbar from "@/comman/navbar";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
     <Navbar/>

    <section className="min-h-screen w-full bg-gray-50 px-4 py-10">
      <div className="mx-auto ">
        {children}
      </div>
    </section>
    </>
  );
}
