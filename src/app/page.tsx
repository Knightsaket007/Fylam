export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans px-6 py-16">
      <h1 className="text-5xl font-bold text-black dark:text-white text-center">
        Fylam
      </h1>
      <p className="mt-4 max-w-xl text-center text-lg text-zinc-600 dark:text-zinc-400">
        AI-powered document assistant. Generate forms, PDFs, and official paperwork in seconds.
      </p>
      
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="/dashboard"
          className="rounded-full bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
        <a
          href="#features"
          className="rounded-full border border-zinc-300 px-6 py-3 font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
