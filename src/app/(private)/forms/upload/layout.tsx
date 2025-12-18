import Navbar from "@/comman/navbar";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
     <Navbar/>

    <section className="min-h-screen w-full bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Upload Form
        </h1> */}

        {children}
      </div>
    </section>
    </>
  );
}
