import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:10000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const getNotifications = async () => {
    try {
        const response = await api.get('/notifications/');
        return response.data;
    } catch (error) {
        console.error("Erro ao receber notificações:", error);
        throw error;
    }
};

export const postNotifications = async (data) => {
    try {
        const response = await api.post('/notifications/', data);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar notificação:", error);
        throw error;
    }
};

/**
 * Cria uma nova notificação
 * @param {Object} notification - Dados da notificação a ser criada
 * @param {string} notification.title - Título da notificação
 * @param {string} notification.message - Mensagem da notificação
 * @param {string} notification.platform - Plataforma de envio (Slack, WhatsApp, Gmail)
 * @param {number} notification.user_id - ID do usuário destinatário
 * @returns {Promise<Object>} - Dados da notificação criada
 */
export const createNotification = async (notification) => {
    try {
        // Enviar dados como parâmetros de query em vez de corpo da requisição
        const response = await api.post('/notifications/', null, {
            params: notification
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar notificação:', error);
        throw error;
    }
};