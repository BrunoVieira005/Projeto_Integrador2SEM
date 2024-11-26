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
    
      <!-- Conteúdo principal -->
      <div class="main-content">
        <div class="image-container">
          <!-- Exibição da imagem do livro -->
          <img :src="book.imageUrl ? `http://localhost:3000${book.imageUrl}` : ''" alt="Capa do Livro" class="book-cover" />
        </div>
  
        <div class="text-container">
          <!-- Título e autor do livro -->
          <h2>{{ book.title }}</h2>
          <span class="book-info">{{ book.author }}</span>
  
          <!-- Ano de publicação -->
          <span class="book-year">Ano de publicação: {{ book.year }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../../../library-frontend/src/services/api'; // Serviço para requisições à API
  
  export default {
    data() {
      return {
        book: {}, // Detalhes do livro
      };
    },
    methods: {
  // Método para buscar o livro usando o ID na URL
  async fetchBookDetails() {
    const bookId = this.$route.params.id; // ID do livro na URL
    try {
      const response = await api.getBookById(bookId); // Requisição à API para pegar os detalhes
      console.log('Resposta da API:', response.data); // Verifique o que a API está retornando
      this.book = response.data; // Preenche os dados do livro
    } catch (error) {
      console.error('Erro ao carregar detalhes do livro:', error);
    }
  },
},

    mounted() {
      this.fetchBookDetails(); // Carrega os detalhes ao montar o componente
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  .container {
    margin: auto;
    width: 100%;
    height: 638px;
    background: rgb(255, 255, 255);
    position: relative;
    overflow: hidden;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-content: center;
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
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  
  .main-content {
    height: 455px;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 137px;
    align-content: center;
    padding: 20px;
  }
  
  .image-container {
    width: 300px;
    height: auto;
    padding-right: 20px;
  }
  
  .book-cover {
    width: 100%;
    height: auto;
  }
  
  .text-container {
    max-width: 600px;
    margin-left: 20px;
  }
  
  .book-info {
    display: block;
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
  }
  
  .book-year {
    display: block;
    font-size: 16px;
    color: #333;
    margin-top: 10px;
  }
  
  .purchase-section {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .price {
    font-size: 24px;
    font-weight: bold;
  }
  
  .purchase-button {
    padding: 10px 20px;
    background-color: #006ead;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .purchase-button:hover {
    background-color: #004f8d;
  }
  </style>
  