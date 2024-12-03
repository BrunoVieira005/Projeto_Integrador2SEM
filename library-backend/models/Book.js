const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    imageUrl: { type: String }, // URL da imagem
    description: { type: String },
    dateAdded: { type: Date, default: Date.now}
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
