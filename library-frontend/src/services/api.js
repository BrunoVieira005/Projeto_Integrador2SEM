import axios from 'axios'; // Importa axios para requisições HTTP

// Cria instância do Axios com URL para base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // URL da API
    headers: {
        'Content-Type': 'application/json', // Define JSON como tipo de conteúdo por padrão
    },
});

// Exporta funções CRUD usando Axios
export default {
    getBooks() {
        return apiClient.get('/books'); // GET para listar livros
    },

    // Função para adicionar um livro com imagem (usa FormData)
    addBook(bookFormData) { 
        return apiClient.post('/books', bookFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Especifica o tipo de conteúdo para envio de arquivos
            },
        });
    },

    // Função para atualizar um livro com imagem (usa FormData)
    updateBook(id, bookFormData) {
        return apiClient.put(`/books/${id}`, bookFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Especifica o tipo de conteúdo para envio de arquivos
            },
        });
    },

    // Função para excluir livro pelo ID
    deleteBook(id) {
        return apiClient.delete(`/books/${id}`); // DELETE para excluir livro
    },

    // Função para buscar um livro pelo ID
    getBookById(bookId) {
        return apiClient.get(`/books/${bookId}`); // GET para obter um livro específico pelo ID
    }
};