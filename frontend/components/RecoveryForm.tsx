"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import RecoveryResult from "@/components/RecoveryResult";
import { recoverPlan } from "@/lib/api";
import type {
    PlanAnalysis,
    RecoveryResponse,
} from "@/types/plan";
import LoadingState from "@/components/LoadingState";

interface RecoveryFormProps {
    originalPlan: string;
    analysis: PlanAnalysis;
}

export default function RecoveryForm({
    originalPlan,
    analysis,
}: RecoveryFormProps) {
    const [whatWentWrong, setWhatWentWrong] = useState("");
    const [recovery, setRecovery] = useState<RecoveryResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const result = await recoverPlan({
                original_plan: originalPlan,
                analysis,
                what_went_wrong: whatWentWrong,
            });

            setRecovery(result);
        } catch {
            setError("We couldn't build your Plan C. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Reality changed
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-100">
                    Something went wrong?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                    Tell PlanB what actually happened. We&apos;ll use your original
                    plan and contingency analysis to build Plan C.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="what-went-wrong"
                    className="mb-3 block text-sm font-medium text-slate-300"
                >
                    What went wrong?
                </label>

                <textarea
                    id="what-went-wrong"
                    value={whatWentWrong}
                    disabled={isLoading}
                    onChange={(event) => setWhatWentWrong(event.target.value)}
                    minLength={5}
                    maxLength={1000}
                    required
                    rows={4}
                    placeholder="My train is running two hours late."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Building Plan C..." : "Build Plan C →"}
                    </button>
                </div>
            </form>
            {isLoading && <LoadingState mode="recover" />}
            {error && (
                <p className="mt-4 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
                    {error}
                </p>
            )}

            {recovery && <RecoveryResult recovery={recovery} />}
        </section>
    );
}