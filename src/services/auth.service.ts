import axiosCredentials from '../config/axios.interceptor';
import axiosNoInterceptor from '../config/axios.nointerceptor';

export const login = async (data: { email: string; password: string }) => {
    try {
        const { email, password } = data;
        if (!email || !password) {
            throw new Error('Vui lòng điền đầy đủ thông tin');
        }
        const res = await axiosNoInterceptor.post(`/auth/login`, JSON.stringify(data));
        return res.data;
    } catch (err: any) {
        if (err.response) {
            console.log(err);
            throw new Error(err.response.data.message); // Ném lỗi để xử lý ở nơi gọi hàm login
        }
    }
};
//sử dụng headers để truyền token và thằng middleware phía backend sẽ nhận được token
//để kiểm tra xem có quyền lấy data người dùng không
export const getUserDetail = async () => {
    try {
        const res = await axiosCredentials.get(`/user/detail`);
        if (res.data) {
            return res.data?.data;
        }
        return null;
    } catch (err: any) {
        console.log(err);
        throw new Error(err.response.data.message);
    }
};
export const register = async (data: any) => {
    try {
        const res = await axiosNoInterceptor.post(`/auth/register`, JSON.stringify(data));
        if (res.data) {
            return res.data;
        }
        return res;
    } catch (err: any) {
        if (err.response) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra';
            throw new Error(errorMessage);
        }
    }
};
export const refreshToken = async () => {
    try {
        const res = await axiosCredentials.post(`/user/refresh-token`, { withCredentials: true });
        return res;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};
