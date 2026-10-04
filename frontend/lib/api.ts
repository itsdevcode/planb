import type {
    PlanAnalysis,
    PlanRequest,
    RecoveryRequest,
    RecoveryResponse,
} from "@/types/plan";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function analyzePlan(
    payload: PlanRequest,
): Promise<PlanAnalysis> {
    const response = await fetch(`${API_URL}/api/v1/plans/analyze`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Unable to analyze your plan.");
    }

    return response.json() as Promise<PlanAnalysis>;
}

export async function recoverPlan(
    payload: RecoveryRequest,
): Promise<RecoveryResponse> {
    const response = await fetch(`${API_URL}/api/v1/plans/recover`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Unable to generate a recovery plan.");
    }

    return response.json() as Promise<RecoveryResponse>;
}