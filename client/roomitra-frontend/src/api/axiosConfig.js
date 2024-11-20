import axios from 'axios';

const baseURL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: baseURL,
});

// Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getFullImageUrl = (path) => {
    if (!path) return null;
    return `http://localhost:8080${path}`;
};

export default api;
