import axiosInterceptor from '@/config/axios.interceptor';

export const callApiBitrix = async (action: string, payload: any) => {
    try {
        // /api/call
        const response = await axiosInterceptor.post(`/api/call?_date=${Date.now()}`, JSON.stringify({ action, payload }));
        console.log('action', action);
        console.log('URL:', axiosInterceptor.defaults.baseURL);
        return response.data || '';
    } catch (error) {
        console.log('ERROR CALL API BITRIX24', error);
        return null;
    }
};
