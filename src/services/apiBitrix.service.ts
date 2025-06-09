import axiosInterceptor from '@/config/axios.interceptor';

export const callApiBitrix = async (action: string, payload: any) => {
    try {
        // /api/call
        const response = await axiosInterceptor.post(`/api/call`, JSON.stringify({ action, payload }));
        console.error('URL:', axiosInterceptor.defaults.baseURL);
        return response.data;
    } catch (error) {
        console.log('ERROR CALL API BITRIX24', error);
    }
};
