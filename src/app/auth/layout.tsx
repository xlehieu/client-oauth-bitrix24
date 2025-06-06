// app/auth/layout.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">{children}</div>
            </div>
        </QueryClientProvider>
    );
}
