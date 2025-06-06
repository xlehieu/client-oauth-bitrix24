import axios from 'axios';
const axiosCredentials = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    //beforeRedirect
});
axiosCredentials.interceptors.response.use(
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
export default axiosCredentials;
