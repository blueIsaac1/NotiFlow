import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:10000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const getNotifications = async () => {
    try{
        const response = await api.get('/notifications/');
        return response.data;
    } catch (error) {
        console.error("Erro ao recebes notificações: ", error)
        throw error;
    }
};