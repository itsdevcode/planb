import type { Risk } from "@/types/plan";

interface RiskCardProps {
    risk: Risk;
}

export default function RiskCard({ risk }: RiskCardProps) {
    const impactStyles = {
        high: "border-red-900/50 bg-red-950/30 text-red-300",
        medium: "border-amber-900/50 bg-amber-950/30 text-amber-300",
        low: "border-emerald-900/50 bg-emerald-950/30 text-emerald-300",
    };

    return (
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-100">
                    {risk.risk}
                </h3>

                <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${impactStyles[risk.impact]}`}
                >
                    {risk.impact} impact
                </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Warning signs
                    </p>

                    <ul className="space-y-2 text-sm leading-6 text-slate-300">
                        {risk.warning_signs.map((sign) => (
                            <li key={sign}>• {sign}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Prevent it
                    </p>

                    <p className="text-sm leading-6 text-slate-300">
                        {risk.prevention}
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                        Your backup
                    </p>

                    <p className="text-sm leading-6 text-slate-200">
                        {risk.backup}
                    </p>
                </div>
            </div>
        </article>
    );
}