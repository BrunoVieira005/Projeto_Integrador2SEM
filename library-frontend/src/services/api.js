import axios from 'axios';

// Cria instância do Axios com URL para base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // URL da API
    headers: {
        'Content-Type': 'application/json', // Define JSON como tipo de conteúdo por padrão
    },
});

// Função para configurar o cabeçalho de Authorization com o token
const setAuthHeader = () => {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    if (token) {
        apiClient.defaults.headers['Authorization'] = `Bearer ${token}`; // Adiciona ao cabeçalho Authorization
    } else {
        apiClient.defaults.headers['Authorization'] = ''; // Garante que o cabeçalho não fique sujo com valores antigos
    }
};

// Faz uma requisição para obter os livros
export default {
    getBooks() {
        setAuthHeader(); // Chama a função para garantir que o token esteja no cabeçalho
        return apiClient.get('/books'); // GET para listar livros
    },

    addBook(bookFormData) {
        setAuthHeader();
        return apiClient.post('/books', bookFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Tipo para enviar arquivos
            },
        });
    },

    updateBook(id, bookFormData) {
        setAuthHeader();
        return apiClient.put(`/books/${id}`, bookFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteBook(id) {
        setAuthHeader();
        return apiClient.delete(`/books/${id}`);
    },

    getBookById(bookId) {
        setAuthHeader();
        return apiClient.get(`/books/${bookId}`);
    },

    submitRating(bookId, rating) {
        setAuthHeader(); // Garantir que o token será enviado
        return apiClient.post(`/books/${bookId}/rate`, { rating });
    },

    reserveBook(bookId) {
        setAuthHeader(); // Garantir que o token será enviado
        return apiClient.post(`/books/${bookId}/reserve`);
    }
};
