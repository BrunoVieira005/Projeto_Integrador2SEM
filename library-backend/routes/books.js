const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const authenticate = require('../../auth-api/middleware/authenticate'); // Importe o middleware de autenticação
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
    const { title, author, year, description } = req.body; // Extrai os dados da requisição
    
    // Aqui estamos assumindo que o campo de imagem seja passado como 'image'
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Salva a URL da imagem

    try {
        const newBook = new Book({ title, author, year, imageUrl, description }); // Adiciona a URL da imagem
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
    const { title, author, year, description } = req.body; // Extraindo os dados da requisição
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Salva o caminho da imagem

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, 
            { title, author, year, imageUrl, description }, 
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

// *** Reservar um Livro ***
router.post('/:id/reserve', authenticate, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id; // O ID do usuário autenticado

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (book.reserved) {
      return res.status(400).json({ message: 'Este livro já está reservado' });
    }

    // Marca o livro como reservado e associa o usuário
    book.reserved = true;
    book.reservedBy = userId;
    await book.save();

    res.status(200).json({ message: 'Livro reservado com sucesso!', book });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao reservar livro', error });
  }
});

// *** Cancelar Reserva de um Livro ***
router.post('/:id/cancel', authenticate, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id; // O ID do usuário autenticado

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    if (!book.reserved || book.reservedBy.toString() !== userId.toString()) {
      return res.status(400).json({ message: 'Este livro não está reservado por você' });
    }

    // Cancela a reserva e remove o usuário
    book.reserved = false;
    book.reservedBy = null;
    await book.save();

    res.status(200).json({ message: 'Reserva cancelada com sucesso!', book });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar reserva', error });
  }
});

// *** Avaliar um Livro ***
router.post('/:id/rate', authenticate, async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id; // O ID do usuário autenticado
  const { rating } = req.body; // Avaliação do livro

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Avaliação inválida. A avaliação deve ser entre 1 e 5.' });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verifica se o usuário já avaliou o livro
    const existingRating = book.ratings.find(r => r.userId.toString() === userId.toString());
    if (existingRating) {
      return res.status(400).json({ message: 'Você já avaliou este livro.' });
    }

    // Adiciona a nova avaliação
    book.ratings.push({ userId, rating });

    // Atualiza a média de avaliações
    const totalRating = book.rating * book.ratingsCount + rating; // Soma a nova avaliação ao total
    book.ratingsCount += 1; // Incrementa o número de avaliações
    book.rating = totalRating / book.ratingsCount; // Calcula a média de avaliações

    await book.save();

    res.status(200).json({ message: 'Avaliação registrada com sucesso!', book });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar avaliação', error });
  }
});

module.exports = router;