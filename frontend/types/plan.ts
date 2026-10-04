export type RiskImpact = "low" | "medium" | "high";

export interface Risk {
    risk: string;
    impact: RiskImpact;
    warning_signs: string[];
    prevention: string;
    backup: string;
}

export interface PlanAnalysis {
    summary: string;
    assumptions: string[];
    risks: Risk[];
    prepare_now: string[];
}

export interface PlanRequest {
    plan: string;
}

export interface RecoveryRequest {
    original_plan: string;
    analysis: PlanAnalysis;
    what_went_wrong: string;
}

export interface RecoveryResponse {
    situation_summary: string;
    immediate_actions: string[];
    revised_plan: string[];
    additional_risks: string[];
}