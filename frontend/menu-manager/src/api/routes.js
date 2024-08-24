// src/api/menuNodeApi.js
import axiosInstance from './api';

// Get all MenuNodes
export const getMenuNodes=async () => {
    try {
        const response=await axiosInstance.get('nodes/');
        return response.data;
    } catch(error) {
        console.error('Error fetching menu nodes:', error);
        throw error;
    }
};

// Create new MenuNodes
export const createMenuNodes=async (nodes) => {
    try {
        const response=await axiosInstance.post('nodes/', nodes);
        return response.data;
    } catch(error) {
        console.error('Error creating menu nodes:', error);
        throw error;
    }
};
