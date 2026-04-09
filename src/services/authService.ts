import apiClient from "./apiClient";

export type RegisterPayload = {
    email: string;
    password: string;
};

export type RegisterResponse = {
    token: string;
    user: {
        id: string;
        email: string;
    };
};

export async function registerUser(payload: RegisterPayload) {
    try {
        const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload);
        return data; 
    } catch (error: any) {
        // Ambil pesan error dari backend
        // Struktur biasanya: error.response.data.message atau error.response.data (tergantung backendmu)
        console.log('API error:', error);
        const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat registrasi';
        
        // Lempar kembali error agar ditangkap oleh catch di onSubmit
        throw new Error(errorMessage);
    }
}