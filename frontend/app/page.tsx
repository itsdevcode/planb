import PlanForm from "@/components/PlanForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <header className="mb-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            Plan<span className="text-violet-400">B</span>
          </div>

          <span className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">
            Powered by Gemma
          </span>
        </header>

        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
            AI contingency planner
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Your Plan A looks good.
            <span className="block text-slate-400">
              Let&apos;s try to break it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            PlanB challenges your assumptions, finds realistic failure
            scenarios, and prepares you before things go wrong.
          </p>

          <div className="mt-10 text-left">
            <PlanForm />
          </div>
        </section>
      </div>
    </main>
  );
}