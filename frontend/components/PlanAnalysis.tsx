import RiskCard from "@/components/RiskCard";
import type { PlanAnalysis as PlanAnalysisType } from "@/types/plan";

interface PlanAnalysisProps {
    analysis: PlanAnalysisType;
}

export default function PlanAnalysis({
    analysis,
}: PlanAnalysisProps) {
    return (
        <section>
            <header>
                <p>PLAN B</p>
                <h2>{analysis.summary}</h2>
            </header>

            <div>
                <h3>Your plan assumes</h3>

                <ul>
                    {analysis.assumptions.map((assumption) => (
                        <li key={assumption}>{assumption}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>What could go wrong?</h3>

                {analysis.risks.map((risk) => (
                    <RiskCard
                        key={`${risk.risk}-${risk.impact}`}
                        risk={risk}
                    />
                ))}
            </div>

            <div>
                <h3>Prepare now</h3>

                <ul>
                    {analysis.prepare_now.map((action) => (
                        <li key={action}>{action}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}