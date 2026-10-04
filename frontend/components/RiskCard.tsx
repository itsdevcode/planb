import type { Risk } from "@/types/plan";

interface RiskCardProps {
    risk: Risk;
}

export default function RiskCard({ risk }: RiskCardProps) {
    return (
        <article>
            <div>
                <h3>{risk.risk}</h3>
                <span>{risk.impact} impact</span>
            </div>

            <div>
                <h4>Warning signs</h4>

                <ul>
                    {risk.warning_signs.map((sign) => (
                        <li key={sign}>{sign}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h4>Prevent it</h4>
                <p>{risk.prevention}</p>
            </div>

            <div>
                <h4>Plan B</h4>
                <p>{risk.backup}</p>
            </div>
        </article>
    );
}