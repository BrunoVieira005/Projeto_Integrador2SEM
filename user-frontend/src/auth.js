import axios from 'axios';

// Cria instância do Axios com URL para base da API de autenticação (porta 5000)
const apiAuthClient = axios.create({
    baseURL: 'http://localhost:5000/api', // URL da API de autenticação
    headers: {
        'Content-Type': 'application/json', // Define JSON como tipo de conteúdo
    },
});

// Função para login
export const login = async (username, password) => {
    try {
        const response = await apiAuthClient.post('/auth/login', { username, password });
        localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para registro
export const register = async (username, password) => {
    try {
        const response = await apiAuthClient.post('/auth/register', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
