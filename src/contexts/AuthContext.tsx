
import { adminLogin } from '@/lib/commonApi';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';



interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem('auth_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);

        try {
            const response: any = await adminLogin({ email, password });

            if (response.success && response.data.user) {
                setUser(response.data.user);
                localStorage.setItem('auth_user', JSON.stringify(response.data.user));
                if (response.data.token) {
                    localStorage.setItem('auth_token', response.data.token);
                }
            }

            setIsLoading(false);
            return { success: response.success, error: response.error };
        } catch (error) {
            setIsLoading(false);
            return { success: false, error: 'An error occurred during login' };
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            // dispatch({ type: "LOGOUT" });
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_token");
        } catch (error: any) {
            console.log(error);
            return { success: false, message: error?.message || "Logout failed" };
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
