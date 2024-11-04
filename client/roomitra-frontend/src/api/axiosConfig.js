import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/', // Your API base URL
});

export default api;
