"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import RecoveryResult from "@/components/RecoveryResult";
import { recoverPlan } from "@/lib/api";
import type {
    PlanAnalysis,
    RecoveryResponse,
} from "@/types/plan";

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
        <section>
            <h3>Something went wrong?</h3>

            <p>Tell PlanB what happened and we&apos;ll build a recovery plan.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="what-went-wrong">
                    What went wrong?
                </label>

                <textarea
                    id="what-went-wrong"
                    value={whatWentWrong}
                    onChange={(event) => setWhatWentWrong(event.target.value)}
                    minLength={5}
                    maxLength={1000}
                    required
                    placeholder="My train is running two hours late."
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Building Plan C..." : "Build Plan C"}
                </button>
            </form>

            {error && <p>{error}</p>}

            {recovery && (
                <RecoveryResult recovery={recovery} />
            )}
        </section>
    );
}