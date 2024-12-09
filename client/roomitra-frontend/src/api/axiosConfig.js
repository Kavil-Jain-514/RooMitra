import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const loadingContext = document.querySelector("#root")?.__loadingContext;
        if (loadingContext?.startLoading) {
            loadingContext.startLoading();
        }
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        const loadingContext = document.querySelector("#root")?.__loadingContext;
        if (loadingContext?.stopLoading) {
            loadingContext.stopLoading();
        }
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        const loadingContext = document.querySelector("#root")?.__loadingContext;
        if (loadingContext?.stopLoading) {
            loadingContext.stopLoading();
        }
        return response;
    },
    (error) => {
        const loadingContext = document.querySelector("#root")?.__loadingContext;
        if (loadingContext?.stopLoading) {
            loadingContext.stopLoading();
        }
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getFullImageUrl = (path) => {
    if (!path) return null;
    return `${baseURL}${path}`;
};

export default api;
