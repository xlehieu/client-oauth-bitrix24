import axios from 'axios';
const axiosNoInterceptor = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosNoInterceptor;
