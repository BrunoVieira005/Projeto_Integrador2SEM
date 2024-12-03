<template>
  <!-- Formulário de Adição/Atualização de Livro -->
  <form @submit.prevent="handleSubmit">
    <input v-model="book.title" placeholder="Título" required />
    <input v-model="book.author" placeholder="Autor" required />
    <input v-model="book.year" placeholder="Ano" required />
    <input v-model="book.description" placeholder="Descrição do Livro" required />


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
      book: this.bookToEdit || { title: '', author: '', year: null, description: '' }, // Inicializa o objeto book
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
      formData.append('description', this.book.description); // Inclui a descrição
      
      if (this.book.image) {
        formData.append('image', this.book.image); // Envia o arquivo de imagem
      }

      // Verifique se é para atualizar ou criar um novo livro
      if (this.book._id) {
        api.updateBook(this.book._id, formData).then(() => {
          this.$emit('book-updated'); // Emite um evento quando o livro é atualizado
          this.resetForm(); // Reseta o formulário após a atualização
        }).catch(error => {
          console.error("Erro ao atualizar livro:", error);
        });
      } else {
        api.addBook(formData).then(() => {
          this.$emit('book-added'); // Emite um evento quando um novo livro é adicionado
          this.resetForm(); // Reseta o formulário após adicionar o livro
        }).catch(error => {
          console.error("Erro ao adicionar livro:", error);
        });
      }
    },
    
    // Função para resetar o formulário
    resetForm() {
      this.book = { title: '', author: '', year: null, description: '' }; // Limpa os campos de texto
      this.imagePreview = null; // Limpa a visualização da imagem
      this.$refs.bookImageInput.value = ''; // Limpa o campo de arquivo de imagem
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f4f7fc;
  padding: 20px;
}

/* Formulário */
form {
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 50%;
  max-width: 500px;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

input:focus {
  border-color: #006ead;
  outline: none;
}

.image-upload {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}

input[type="file"] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.image-preview {
  margin-top: 15px;
  text-align: center;
}

.uploaded-image {
  max-width: 200px;
  border-radius: 10px;
  margin-top: 10px;
}

button {
  background-color: #006ead;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #004f8d;
}

button:focus {
  outline: none;
}
</style>