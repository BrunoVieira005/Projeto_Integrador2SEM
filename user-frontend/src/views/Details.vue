<template>
  <div class="container">
    <div class="header">
      <div class="icon"></div>
      <span class="header-title">Manage Book</span>
    </div>

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

        <!-- Descrição do livro -->
        <p class="book-description">{{ book.description }}</p>

        <!-- Estrelas de Avaliação -->
        <div class="star-rating">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ filled: star <= (userRating || book.rating) }"
            @click="handleRating(star)"
          >★</span>
        </div>

        <!-- Mostrar a nota selecionada (opcional) -->
        <div v-if="userRating !== null">
          <span class="user-rating">Sua avaliação: {{ userRating }} estrelas</span>
        </div>

        <!-- Disponibilidade -->
        <div class="availability">
          <span v-if="book.reserved" class="unavailable">Indisponível</span>
          <span v-else class="available">Disponível</span>
        </div>

        <!-- Botão de Reserva -->
        <div v-if="!book.reserved">
          <button @click="reserveBook" class="reserve-button">Reservar</button>
        </div>
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
      userRating: null, // Avaliação do usuário
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
        this.userRating = this.book.ratings.find(rating => rating.userId === this.$store.state.userId)?.rating || null; // Atualiza a avaliação do usuário
      } catch (error) {
        console.error('Erro ao carregar detalhes do livro:', error);
        
      }
    },

    // Método para realizar a reserva do livro
    async reserveBook() {
      const bookId = this.book._id;
      try {
        const response = await api.reserveBook(bookId); // Requisição para reservar o livro
        if (response.status === 200) {
          alert('Livro reservado com sucesso!');
          this.book.reserved = true; // Atualiza a disponibilidade
        }
      } catch (error) {
        console.error('Erro ao reservar livro:', error);
        console.log(localStorage.getItem('token')); // Verifique se o token está presente
        alert('Erro ao tentar reservar o livro.');
      }
    },

    // Método para lidar com a avaliação do usuário
    handleRating(star) {
      this.userRating = star;
      // Envia a avaliação para a API
      this.submitRating();
    },

    // Envia a avaliação para a API
    async submitRating() {
      const bookId = this.book._id;
      try {
        const response = await api.submitRating(bookId, this.userRating); // Envia a avaliação
        if (response.status === 200) {
          alert('Avaliação registrada!');
          // Atualiza a avaliação no frontend
          this.fetchBookDetails(); // Recarrega os detalhes para refletir a nova média
        }
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        alert('Erro ao tentar avaliar o livro.');
      }
    }
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

.book-description {
  display: block;
  font-size: 16px;
  color: #666;
  margin-top: 20px;
  line-height: 1.6;
  word-wrap: break-word;
}

/* Estrelas de Avaliação */
.star-rating {
  display: flex;
  margin-top: 20px;
}

.star {
  font-size: 20px;
  color: #d3d3d3;
  cursor: pointer;
}

.star.filled {
  color: #FFD700;
}

.user-rating {
  margin-top: 10px;
  font-size: 16px;
}

/* Disponibilidade */
.availability {
  margin-top: 20px;
  font-size: 16px;
}

.available {
  color: green;
}

.unavailable {
  color: red;
}

/* Botão de Reservar */
.reserve-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #006ead;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reserve-button:hover {
  background-color: #004f8d;
}
</style>