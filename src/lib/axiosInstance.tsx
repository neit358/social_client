import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (config.url === '/auth/refresh') return config;
        const date = new Date();
        const currentTime = date.getTime();
        let token = handleGetAccessToken();
        if (!token) return config;
        const decodedToken = jwt_decode(token);
        if (decodedToken && decodedToken.exp !== undefined) {
            const expirationTime = decodedToken.exp * 1000;
            if (currentTime > expirationTime) {
                try {
                    await axiosInstance.get('/auth/refresh');
                    token = handleGetAccessToken();
                    if (!token) return config;
                    config.headers['Authorization'] = `Bearer ${token}`;
                } catch {
                    return config;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const handleGetAccessToken = () => {
    const accessToken = document.cookie;
    const token = accessToken
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

    if (token) {
        return token;
    } else {
        return null;
    }
};

export default axiosInstance;
