const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    imageUrl: { type: String }, // URL da imagem
    description: { type: String },
    dateAdded: { type: Date, default: Date.now },

    // Campos para reserva
    reserved: { type: Boolean, default: false }, // Indica se o livro está reservado
    reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Usuário que fez a reserva

    // Campos para avaliação
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    rating: { type: Number, default: 0 }, // Média das avaliações
    ratingsCount: { type: Number, default: 0 }, // Número de avaliações
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
