const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://bruno:senai@library.j9vny.mongodb.net/', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);
// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Definir a porta do servidor 
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});