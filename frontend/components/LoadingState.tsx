interface LoadingStateProps {
    mode: "analyze" | "recover";
}

export default function LoadingState({
    mode,
}: LoadingStateProps) {
    const message =
        mode === "analyze"
            ? "Challenging your assumptions..."
            : "Rebuilding your plan...";

    const description =
        mode === "analyze"
            ? "Looking for weak points, warning signs, and realistic backups."
            : "Using what went wrong to find your best next move.";

    return (
        <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <div className="flex items-start gap-4">
                <div className="mt-1 h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />

                <div>
                    <p className="font-medium text-slate-200">
                        {message}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}