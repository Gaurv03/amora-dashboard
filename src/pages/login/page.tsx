
import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router-dom"
import { LoginForm } from "./login-form";


export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();

    // If user is already authenticated, redirect to dashboard
    if (!isLoading && isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <LoginForm />
            </div>
        </div>
    )
}
