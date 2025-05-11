import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.get('/auth/refresh');
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
