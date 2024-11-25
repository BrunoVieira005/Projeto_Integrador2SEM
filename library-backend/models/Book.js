const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    imageUrl: { type: String }  // Adiciona o campo imageUrl para armazenar a URL da imagem
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
