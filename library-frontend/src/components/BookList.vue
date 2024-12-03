<template>
  <div class="list">
    <h2>Lista de Livros</h2>
    <ul>
      <li v-for="book in books" :key="book._id" class="book-item">
        <span class="book-info">{{ book.title }} - {{ book.author }} ({{ book.year }})</span>
        <p>{{ book.description }}</p>
        <div class="buttons">
          <button @click="editBook(book)" class="edit-button">Editar</button>
          <button @click="deleteBook(book._id)" class="delete-button">Excluir</button>
        </div>
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
/* Centraliza e estiliza a lista de livros */
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  width: 80%;
  max-width: 800px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.book-info {
  flex-grow: 1;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: translateY(-2px);
}
</style>