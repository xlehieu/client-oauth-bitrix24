import { useQuery } from '@tanstack/react-query';

export function useQueryHook<TVaiables = any, TData = any>(key: string | string[], callback: (data: TVaiables) => Promise<TData>) {
    const query = useQuery({
        queryKey: typeof key === 'string' ? [key] : typeof key === 'object' ? [...key] : [''],
        queryFn: () => callback, //gọi hàm callback luôn khi component render
    });
    return query;
}
