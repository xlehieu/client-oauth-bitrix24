// app/auth/layout.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // không fetch lại khi focus lại cửa sổ
            refetchOnReconnect: false, // không fetch lại khi mạng reconnect
            retry: 5, // số lần retry nếu lỗi
            staleTime: 1000 * 60 * 60, // dữ liệu được gọi lại sau 1 giờ
        },
    },
});
queryClient.invalidateQueries();
export default function QueryClientProviderComp({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
