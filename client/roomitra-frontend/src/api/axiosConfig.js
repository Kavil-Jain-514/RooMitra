import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/', // Your API base URL
});

export default api;
