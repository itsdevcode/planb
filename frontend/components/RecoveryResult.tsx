import type { RecoveryResponse } from "@/types/plan";

interface RecoveryResultProps {
    recovery: RecoveryResponse;
}

export default function RecoveryResult({
    recovery,
}: RecoveryResultProps) {
    return (
        <section>
            <header>
                <p>PLAN C</p>
                <h2>{recovery.situation_summary}</h2>
            </header>

            <div>
                <h3>Do this now</h3>

                <ol>
                    {recovery.immediate_actions.map((action) => (
                        <li key={action}>{action}</li>
                    ))}
                </ol>
            </div>

            <div>
                <h3>Revised plan</h3>

                <ol>
                    {recovery.revised_plan.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>

            <div>
                <h3>Watch out for</h3>

                <ul>
                    {recovery.additional_risks.map((risk) => (
                        <li key={risk}>{risk}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}