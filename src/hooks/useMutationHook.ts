import { useMutation } from '@tanstack/react-query';

export function useMutationHook<TVaiables = any, TData = any>(callback: (data: TVaiables) => Promise<TData>) {
    const mutation = useMutation({
        mutationFn: callback,
    });
    return mutation;
}
