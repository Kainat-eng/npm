import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000', // Update this URL to your backend's address
});

// Automatically attach token to requests if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
