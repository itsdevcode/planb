"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { analyzePlan } from "@/lib/api";
import type { PlanAnalysis as PlanAnalysisType } from "@/types/plan";
import PlanAnalysis from "@/components/PlanAnalysis";
import RecoveryForm from "@/components/RecoveryForm";
import LoadingState from "@/components/LoadingState";

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
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20"
            >
                <label
                    htmlFor="plan"
                    className="mb-3 block text-sm font-medium text-slate-300"
                >
                    What&apos;s your Plan A?
                </label>

                <textarea
                    id="plan"
                    disabled={isLoading}
                    value={plan}
                    onChange={(event) => setPlan(event.target.value)}
                    minLength={10}
                    maxLength={3000}
                    required
                    rows={6}
                    placeholder="Tomorrow I have a job interview in Delhi at 11 AM. My train leaves at 6 AM..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-base leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs leading-5 text-slate-500">
                        Be specific. Dates, times and dependencies help.
                    </span>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:shrink-0"
                    >
                        {isLoading ? "Challenging your plan..." : "Challenge my plan →"}
                    </button>
                </div>
            </form>
            {isLoading && <LoadingState mode="analyze" />}
            {error && (
                <p className="mt-4 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
                    {error}
                </p>
            )}

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