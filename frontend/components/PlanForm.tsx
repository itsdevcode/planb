"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { analyzePlan } from "@/lib/api";
import type { PlanAnalysis as PlanAnalysisType } from "@/types/plan";
import PlanAnalysis from "@/components/PlanAnalysis";
import RecoveryForm from "@/components/RecoveryForm";

export default function PlanForm() {
    const [plan, setPlan] = useState("");
    const [analysis, setAnalysis] = useState<PlanAnalysisType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await analyzePlan({ plan });

            setAnalysis(result);
        } catch {
            setError("We couldn't analyze your plan. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="plan">What&apos;s your Plan A?</label>

                <textarea
                    id="plan"
                    value={plan}
                    onChange={(event) => setPlan(event.target.value)}
                    minLength={10}
                    maxLength={3000}
                    required
                    placeholder="Tomorrow I have a job interview in Delhi at 11 AM..."
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Challenging your plan..." : "Challenge my plan"}
                </button>
            </form>

            {error && <p>{error}</p>}

            {analysis && (
                <>
                    <PlanAnalysis analysis={analysis} />

                    <RecoveryForm
                        originalPlan={plan}
                        analysis={analysis}
                    />
                </>
            )}
        </section>
    );
}