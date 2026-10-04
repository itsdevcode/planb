import type { RecoveryResponse } from "@/types/plan";

interface RecoveryResultProps {
    recovery: RecoveryResponse;
}

export default function RecoveryResult({
    recovery,
}: RecoveryResultProps) {
    return (
        <section className="mt-10 border-t border-slate-800 pt-10">
            <header>
                <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                        Plan C
                    </span>

                    <span className="text-sm text-slate-500">
                        Recovery mode
                    </span>
                </div>

                <h2 className="text-2xl font-bold leading-9 text-slate-100">
                    {recovery.situation_summary}
                </h2>
            </header>

            <div className="mt-8 rounded-xl border border-orange-900/40 bg-orange-950/20 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Do this now
                </p>

                <ol className="mt-4 space-y-4">
                    {recovery.immediate_actions.map((action, index) => (
                        <li
                            key={action}
                            className="flex gap-4 text-sm leading-6 text-slate-200"
                        >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-400">
                                {index + 1}
                            </span>

                            <span>{action}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-100">
                    Revised plan
                </h3>

                <ol className="mt-4 space-y-3">
                    {recovery.revised_plan.map((step, index) => (
                        <li
                            key={step}
                            className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300"
                        >
                            <span className="font-semibold text-violet-400">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Watch out for
                </p>

                <ul className="mt-3 space-y-2">
                    {recovery.additional_risks.map((risk) => (
                        <li
                            key={risk}
                            className="flex gap-3 text-sm leading-6 text-slate-400"
                        >
                            <span className="text-amber-400">⚠</span>
                            <span>{risk}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}