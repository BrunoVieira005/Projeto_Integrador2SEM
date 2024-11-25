<template>
  <div id="app">
    <!-- Formulário para adicionar ou editar um livro -->
    <BookForm :bookToEdit="bookToEdit" @book-added="fetchBooks" @book-updated="fetchBooks" />
    <!-- Lista de livros -->
    <BookList @edit-book="setBookToEdit" ref="bookList" />
  </div>
</template>

<script>
import BookList from './components/BookList.vue';
import BookForm from './components/BookForm.vue';
import api from './services/api'; // Importa o serviço API para buscar livros

export default {
  data() {
    return {
      bookToEdit: null, // Inicializa o estado do livro a ser editado
    };
  },

  components: {
    BookList,
    BookForm,
  },    

  methods: {
    // Função para definir o livro que será editado
    setBookToEdit(book) {
      this.bookToEdit = book; // Atualiza o livro a ser editado
    },

    // Função para atualizar a lista de livros após adicionar ou editar
    async fetchBooks() {
      try {
        const response = await api.getBooks(); // Faz a requisição para buscar livros
        this.$refs.bookList.books = response.data; // Atualiza a lista no componente BookList
        this.bookToEdit = null; // Limpa o formulário após a ação
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
  },

  mounted() {
    this.fetchBooks(); // Carrega a lista de livros ao montar o componente
  },
};
</script>

<style scoped>
/* Estilos para o App */
</style>
