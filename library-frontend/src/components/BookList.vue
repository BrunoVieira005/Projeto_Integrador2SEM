<template>
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        <li v-for="book in books" :key="book._id">
          {{ book.title }} - {{ book.author }} ({{ book.year }})
          <button @click="editBook(book)">Editar</button>
          <button @click="deleteBook(book._id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api'; // Importa o serviço API
  
  export default {
    data() {
      return {
        books: [] // Inicializa a lista de livros
      };
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await api.getBooks(); // Busca os livros
          this.books = response.data; // Atualiza a lista de livros
        } catch (error) {
          console.error('Erro ao buscar livros:', error);
        }
      },
      editBook(book) {
        this.$emit('edit-book', book); // Emite o evento para editar o livro
      },
      async deleteBook(id) {
        try {
          await api.deleteBook(id); // Exclui o livro
          this.fetchBooks(); // Atualiza a lista após exclusão
        } catch (error) {
          console.error('Erro ao excluir livro:', error);
        }
      }
    },
    mounted() {
      this.fetchBooks(); // Carrega a lista de livros ao montar o componente
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para o BookList */
  </style>
  