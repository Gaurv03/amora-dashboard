import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
    message?: string;
}

export function LoadingScreen({ message = "Loading brand information..." }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>
            </div>
        </div>
    );
}
