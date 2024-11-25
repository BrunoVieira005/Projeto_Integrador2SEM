<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="book.title" placeholder="Título" required />
    <input v-model="book.author" placeholder="Autor" required />
    <input v-model="book.year" placeholder="Ano" required />

    <!-- Campo de upload de imagem -->
    <div class="image-upload">
      <label for="book-image">Escolha a imagem do livro:</label>
      <input type="file" id="book-image" @change="handleImageUpload" accept="image/*" />
    </div>

    <!-- Visualização da imagem -->
    <div v-if="imagePreview" class="image-preview">
      <p>Imagem selecionada:</p>
      <img :src="imagePreview" alt="Imagem do livro" class="uploaded-image" />
    </div>

    <button type="submit">{{ book._id ? 'Atualizar' : 'Adicionar' }}</button>
  </form>
</template>

<script>
import api from '../services/api'; // Importa o serviço API para fazer requisições

export default {
  props: ['bookToEdit'], // Recebe o livro a ser editado como uma prop
  data() {
    return {
      book: this.bookToEdit || { title: '', author: '', year: null }, // Inicializa o objeto book
      imagePreview: null, // Para armazenar o URL da imagem selecionada
    };
  },
  watch: {
    bookToEdit: {
      immediate: true, // Chama o watcher imediatamente
      handler(newBook) {
        this.book = newBook || { title: '', author: '', year: null }; // Atualiza o livro a ser editado
      }
    }
  },
  methods: {
    // Função para enviar o formulário
    handleSubmit() {
  const formData = new FormData(); // Crie um FormData
  formData.append('title', this.book.title); // Adiciona os dados do livro
  formData.append('author', this.book.author);
  formData.append('year', this.book.year);
  
  if (this.book.image) {
    formData.append('image', this.book.image); // Envia o arquivo de imagem
  }

  // Verifique se é para atualizar ou criar um novo livro
  if (this.book._id) {
    api.updateBook(this.book._id, formData).then(() => {
      this.$emit('book-updated'); // Emite um evento quando o livro é atualizado
    }).catch(error => {
      console.error("Erro ao atualizar livro:", error);
    });
  } else {
    api.addBook(formData).then(() => {
      this.$emit('book-added'); // Emite um evento quando um novo livro é adicionado
    }).catch(error => {
      console.error("Erro ao adicionar livro:", error);
    });
  }
},
handleImageUpload(event) {
  const file = event.target.files[0]; // Obtém o arquivo de imagem
  if (file && file.type.startsWith('image/')) { // Verifica se é uma imagem
    this.book.image = file; // Armazena o arquivo de imagem no objeto book
    this.imagePreview = URL.createObjectURL(file); // Cria um URL temporário para a imagem
  } else {
    alert('Por favor, selecione uma imagem válida.');
  }
}
  },
};
</script>

<style scoped>
/* Estilos para o campo de upload e a visualização da imagem */
.image-upload {
  margin-bottom: 20px;
}

.image-preview {
  margin-top: 20px;
  text-align: center;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>