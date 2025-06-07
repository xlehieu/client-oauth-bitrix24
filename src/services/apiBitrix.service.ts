import axiosInterceptor from '@/config/axios.interceptor';

export const getDataApiBitrix = async (action: string, payload: any) => {
    try {
        // /api/call
        const response = await axiosInterceptor.post(`/api/call`, JSON.stringify({ action, payload }));
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
