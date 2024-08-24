// src/axiosInstance.js
import axios from 'axios';

const axiosInstance=axios.create({
    baseURL: 'https://ouivouchers.pythonanywhere.com/api/', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
