import { useQuery } from '@tanstack/react-query';

export function useQueryHook(key: string | string[], callback: any) {
    const query = useQuery({
        queryKey: typeof key === 'string' ? [key] : typeof key === 'object' ? [...key] : [''],
        queryFn: () => callback, //gọi hàm callback luôn khi component render
    });
    return query;
}
