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
            <li><a href="/newest">Novos</a></li> <!-- Link para a página de livros mais recentes -->
          </ul>
        </div>
      </aside>
  
      <!-- Título para a seção dos novos livros -->
      <h2 class="discover-title">Livros recém adicionados na plataforma :DD</h2>
  
      <!-- Contêiner de livros -->
      <div class="book-container">
        <div v-if="loading" class="loading-message">Carregando...</div>
        <div v-else-if="filteredBooks.length === 0" class="no-books-message">
          Não há livros recentes para exibir.
        </div>
        <div
          v-else
          class="book-card"
          v-for="book in filteredBooks"
          :key="book._id"
          :data-title="book.title"
          :data-author="book.author"
        >
          <router-link :to="`/livro/${book._id}`">
            <img
              :src="`http://localhost:3000${book.imageUrl}`"
              alt="Imagem do Livro"
              v-if="book.imageUrl"
              class="book-image"
            />
          </router-link>
          <span class="book-title">{{ book.title }}</span>
          <span class="book-author">{{ book.author }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../../../library-frontend/src/services/api'; // Serviço para requisições à API
  
  export default {
    data() {
      return {
        books: [],
        filteredBooks: [], // Lista de livros filtrada
        loading: true, // Controle de carregamento
      };
    },
    methods: {
      async fetchNewestBooks() {
        try {
          const response = await api.getBooks(); // Busca todos os livros
          this.books = response.data || [];
          // Ordena os livros por data de adição e pega os 5 mais recentes
          this.filteredBooks = this.books
            .sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)) // Ordena pelos campos dateAdded
            .slice(0, 5); // Pega os 5 mais recentes
  
        } catch (error) {
          console.error('Erro ao buscar livros mais recentes:', error);
        } finally {
          this.loading = false; // Desativa o estado de carregamento
        }
      },
    },
    mounted() {
      this.fetchNewestBooks(); // Carrega os livros mais recentes ao montar o componente
    },
  };
  </script>
  
  <style scoped>
  * {
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  
  body {
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
  }
  
  .sidebar-content {
    padding: 20px;
    color: white;
  }
  
  .sidebar ul {
    font-size: 19px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  
  .sidebar a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  
  .discover-title {
    margin-top: 120px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #000;
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
  font-weight: 600;
  display: flex;
  justify-content: center;
  }

  .book-author {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  }
  
  .loading-message {
    font-size: 18px;
    color: #555;
    text-align: center;
    margin-top: 20px;
  }
  
  .no-books-message {
    font-size: 18px;
    color: #555;
    text-align: center;
    margin-top: 20px;
  }
  
  </style>