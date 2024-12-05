<template>
  <div class="container">
    <div class="header">
      <div class="icon"></div>
      <span class="header-title">Mange Book</span>
    </div>

    <aside class="sidebar" id="sidebar">
      <div class="sidebar-content">
        <ul class="sidebar-list">
          <li><a href="/dashboard">Página Inicial</a></li>
          <li><a href="/newest">Novos</a></li>
        </ul>
      </div>
    </aside>

    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="searchBooks"
        type="text"
        class="search-bar"
        placeholder="Buscar..."
      />
      <button class="search-button">🔍</button>
    </div>

    <h2 class="discover-title">Descubra</h2>

    <div class="book-container">
      <!-- Exibição de livros, os títulos são dinamicamente filtrados -->
      <div
        class="book-card"
        v-for="book in currentBooks"
        :key="book._id"
        :data-title="book.title"
        :data-author="book.author"
      >
        <!-- Link para a página de detalhes do livro -->
        <router-link :to="`/livro/${book._id}`">
          <img
            :src="`http://localhost:3000${book.imageUrl}`"
            alt="Imagem do Livro"
            v-if="book.imageUrl"
            class="book-image"
          />
        </router-link>
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" :class="{'filled': n <= book.rating}">
            ★
          </span>
        </div>
        <span class="book-title">{{ book.title }}</span>
        <span class="book-author">{{ book.author }}</span>

      </div>
    </div>

    <!-- Paginação -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
    </div>

    <!-- Botão para redirecionar ao formulário de livro -->
    <div class="add-book-button">
      <button @click="goToBookForm">Adicionar Livro</button>
    </div>
  </div>
</template>

<script>
import api from '../../../library-frontend/src/services/api'; // Serviço para requisições à API

export default {
  data() {
    return {
      books: [], // Lista de todos os livros
      searchQuery: '', // Para a pesquisa
      filteredBooks: [], // Lista de livros filtrada
      currentPage: 1, // Página atual
      booksPerPage: 10, // Quantidade de livros por página
      totalPages: 0, // Total de páginas
    };
  },
  computed: {
    // Livros a serem exibidos na página atual
    currentBooks() {
      const startIndex = (this.currentPage - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await api.getBooks(); // Requisição para pegar todos os livros
        this.books = response.data;
        this.filteredBooks = this.books; // Inicializa com todos os livros
        this.totalPages = Math.ceil(this.books.length / this.booksPerPage); // Calcula o total de páginas
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
    searchBooks() {
      // Filtra livros com base na pesquisa
      if (this.searchQuery.trim() === '') {
        this.filteredBooks = this.books; // Se não houver filtro, exibe todos os livros
      } else {
        this.filteredBooks = this.books.filter((book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      this.totalPages = Math.ceil(this.filteredBooks.length / this.booksPerPage); // Atualiza o total de páginas
      this.currentPage = 1; // Reinicia para a primeira página após o filtro
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1; // Vai para a página anterior
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1; // Vai para a próxima página
      }
    },
    goToBookForm() {
      // Redireciona para o formulário de adição de livro
      window.location.href = 'http://localhost:8081/BookForm';
    }
  },
  mounted() {
    this.fetchBooks(); // Carrega os livros ao montar o componente
  },
};
</script>

<style scoped>
/* Estilos principais */
* {
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

body {
  font-family: sans-serif;
  background: rgb(255, 255, 255);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 115px;
  background: rgba(0, 110, 173, 1);
  position: fixed;
  top: 0;
  border-bottom: 1px solid black;
  z-index: 100;
}

.header-title {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: sans-serif;
  font-weight: 600;
  font-size: 32px;
  margin: 0 20px;
}

.icon {
  width: 149px;
  height: 108px;
  background: url("../assets/book.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-left: 10px;
}

.sidebar {
  width: 250px;
  height: calc(100vh - 115px);
  background: rgba(0, 110, 173, 1);
  position: fixed;
  top: 115px;
  left: 0;
  border-top: 0px solid black;
}

.sidebar-content {
  padding: 20px;
  color: white;
}

.sidebar ul {
  font-size: 19px;
  list-style-type: none;
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 18px;
}

.sidebar a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.search-container {
  position: relative;
  width: 350px;
  margin-top: 135px;
}

.search-bar {
  width: 100%;
  max-width: 400px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
  height: 40px;
  font-size: 17px;
}

.search-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.discover-title {
  margin-top: 30px;
  font-size: 24px;
  font-weight: bold;
}

.book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 80px;
  width: calc(100% - 300px);
  margin-left: 250px;
}

.book-card {
  width: 220px;
  background: rgb(226, 225, 225);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.5s ease-in-out;
}

.book-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}

.book-image {
  width: 80%;
  height: 200px;
  border-radius: 10px;
}

.book-title {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  margin-top: 10px;
  font-weight: 500;
}

.book-author {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 5px;
}

.rating {
  margin-top: 10px;
}

.star {
  font-size: 18px;
  color: #ccc;
}

.star.filled {
  color: #ffca28;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.add-book-button {
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  background-color: rgba(0, 110, 173, 1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

button:hover {
  background-color: rgba(0, 90, 150, 1);
}
</style>