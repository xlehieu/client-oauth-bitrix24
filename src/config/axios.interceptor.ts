import axios from 'axios';
const axiosInterceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false, // tắt vì 1- chưa có cookie 2- sử dụng ngrok thì nó tự trả về access-control-allow-origin: *
    headers: {
        'Content-Type': 'application/json',
    },
    //beforeRedirect
});
axiosInterceptor.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    console.log('TOKEN LOCAL STORAGE: ', token);
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});
axiosInterceptor.interceptors.response.use(
    (response) => response, // Trả về reponse nếu không có lỗi,)
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/auth/login';
            return;
        } else if ([403, 404].includes(error.response?.status)) {
            window.location.href = '/page-not-found';
        }
        return Promise.reject(error); // Trả về l��i nếu có l��i
    },
);
export default axiosInterceptor;
