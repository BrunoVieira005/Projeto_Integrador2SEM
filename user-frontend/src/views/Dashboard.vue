<template>
  <div class="container">
    <div class="header">
      <div class="icon"></div>
      <span class="header-title">Mange Book</span>
    </div>

    <aside class="sidebar" id="sidebar">
      <div class="sidebar-content">
        <ul class="sidebar-list">
          <li><a href="#">Em destaque</a></li>
          <li><a href="#">Novos</a></li>
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
      <img src="../assets/filter.svg" alt="Filtro" class="filter-icon" />
      <button class="search-button">🔍</button>
    </div>

    <h2 class="discover-title">Descubra</h2>

    <div class="book-container">
      <!-- Exibição de livros, os títulos são dinamicamente filtrados -->
      <div
        class="book-card"
        v-for="book in filteredBooks"
        :key="book._id"
        :data-title="book.title"
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
        <span class="book-title">{{ book.title }}</span>
      </div>
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
      books: [],
      searchQuery: '', // Para a pesquisa
      filteredBooks: [], // Lista de livros filtrada
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await api.getBooks(); // Busca todos os livros
        this.books = response.data;
        this.filteredBooks = this.books; // Inicializa com todos os livros
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },
    searchBooks() {
      // Filtra livros com base na pesquisa
      if (this.searchQuery.trim() === '') {
        this.filteredBooks = this.books;
      } else {
        this.filteredBooks = this.books.filter((book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
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

* {
  overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
  font-size: 23px;
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
}

.filter-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: auto;
  opacity: 0.5;
}

.search-button {
  position: absolute;
  right: 10px;
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
  gap: 95px;
  width: calc(100% - 300px);
  margin-left: 250px;
}

.book-card {
  width: 200px;
  background: rgb(226, 225, 225);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(10, 106, 208, 0.1);
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.book-title {
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}

.add-book-button {
  margin-top: 20px;
}

.add-book-button button {
  padding: 10px 20px;
  background-color: #006ead;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-book-button button:hover {
  background-color: #004f8d;
}
</style>
