const mongoose = require('mongoose');
const Book = require('../models/Book');

// Função de migração para adicionar novos campos aos livros existentes
async function migrateBooks() {
  try {
    // Conectando ao banco de dados MongoDB
    await mongoose.connect('mongodb+srv://bruno:senai@library.j9vny.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado ao banco de dados');

    // Atualizar todos os livros
    const books = await Book.find(); // Busca todos os livros
    if (books.length === 0) {
      console.log('Nenhum livro encontrado para migração');
      return;
    }

    console.log(`Migrando ${books.length} livros...`);

    // Iterando sobre todos os livros e atualizando os campos
    for (let book of books) {
      // Adicionando campos de reserva e avaliação, se não existirem
      if (book.reserved === undefined) {
        book.reserved = false;
      }
      if (book.reservedBy === undefined) {
        book.reservedBy = null;
      }
      if (book.ratings === undefined) {
        book.ratings = [];
      }
      if (book.rating === undefined) {
        book.rating = 0;
      }
      if (book.ratingsCount === undefined) {
        book.ratingsCount = 0;
      }

      // Salvando o livro atualizado
      await book.save();
    }

    console.log('Migração concluída com sucesso!');
    process.exit(0); // Encerra o processo
  } catch (error) {
    console.error('Erro durante a migração:', error);
    process.exit(1); // Encerra o processo com erro
  }
}

// Chama a função de migração
migrateBooks();
