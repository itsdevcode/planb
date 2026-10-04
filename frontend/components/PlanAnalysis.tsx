import RiskCard from "@/components/RiskCard";
import type { PlanAnalysis as PlanAnalysisType } from "@/types/plan";

interface PlanAnalysisProps {
    analysis: PlanAnalysisType;
}

export default function PlanAnalysis({
    analysis,
}: PlanAnalysisProps) {
    return (
        <section className="mt-16 text-left">
            <header className="mb-10">
                <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">
                        Plan B
                    </span>

                    <span className="text-sm text-slate-500">
                        Contingency analysis
                    </span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-100">
                    {analysis.summary}
                </h2>
            </header>

            <div className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="mb-5 text-lg font-semibold text-slate-100">
                    Your plan depends on these assumptions
                </h3>

                <ul className="space-y-3">
                    {analysis.assumptions.map((assumption) => (
                        <li
                            key={assumption}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                        >
                            <span className="mt-0.5 text-violet-400">◆</span>
                            <span>{assumption}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="mb-6">
                    <p className="text-sm font-medium text-slate-500">
                        FAILURE SCENARIOS
                    </p>

                    <h3 className="mt-1 text-2xl font-semibold text-slate-100">
                        What could go wrong?
                    </h3>
                </div>

                <div className="grid gap-5">
                    {analysis.risks.map((risk) => (
                        <RiskCard
                            key={`${risk.risk}-${risk.impact}`}
                            risk={risk}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-12 rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Prepare now
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-100">
                    Do these before you need Plan B
                </h3>

                <ul className="mt-5 space-y-3">
                    {analysis.prepare_now.map((action) => (
                        <li
                            key={action}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                        >
                            <span className="font-bold text-emerald-400">✓</span>
                            <span>{action}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}