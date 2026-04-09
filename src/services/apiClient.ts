import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from '../constants/Api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});
/**
 * Helper untuk akses storage yang aman lintas platform
 */
const getStorageItem = async (key: string) => {
    if (Platform.OS === 'web') {
        return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
};

const deleteStorageItem = async (key: string) => {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};

// Interceptor Request
apiClient.interceptors.request.use(async (config) => {
    // Gunakan helper, bukan SecureStore langsung
    const token = await getStorageItem('auth_token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor Response
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Gunakan helper di sini juga
            await deleteStorageItem('auth_token');
            
            // Tips: Untuk redirect di Expo Router, kamu bisa gunakan:
            // router.replace('/login'); 
            // (Pastikan sudah import { router } from 'expo-router')
        }
        return Promise.reject(error);
    }
);

export default apiClient;