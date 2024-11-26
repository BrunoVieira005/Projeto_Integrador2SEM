const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const router = express.Router();

// Configuração do Multer para gerenciar o upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtém a extensão do arquivo
    const filename = Date.now() + ext; // Nome único para evitar conflitos
    cb(null, filename); // Definir o nome do arquivo com timestamp
  }
});

const upload = multer({ storage: storage }); // Middleware do Multer

// *** CRIAÇÃO (POST) ***
router.post('/', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body; // Extrai os dados da requisição
    
    // Aqui estamos assumindo que o campo de imagem seja passado como 'image'
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Salva a URL da imagem

    try {
        const newBook = new Book({ title, author, year, imageUrl }); // Adiciona a URL da imagem
        await newBook.save();
        res.status(201).json(newBook); // Retorna o livro criado com a imagem
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar livro', error });
    }
});

// *** LEITURA (GET) ***
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Busca todos os livros
        res.status(200).json(books); // Retorna a lista dos livros
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error });
    }
});

// *** LEITURA (GET) POR ID ***
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Busca o livro pelo ID
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' }); // Retorna erro 404 se não encontrar o livro
        }
        res.status(200).json(book); // Retorna o livro encontrado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livro', error });
    }
});

// *** ATUALIZAÇÃO (PUT) ***
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body; // Extraindo os dados da requisição
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Salva o caminho da imagem

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, 
            { title, author, year, imageUrl }, 
            { new: true } // Para retornar o documento atualizado
        );
        res.status(200).json(updatedBook); // Retorna o livro atualizado com a imagem
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error });
    }
});

// *** EXCLUSÃO (DELETE) ***
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id); // Deleta o livro pelo ID
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error });
    }
});

module.exports = router;