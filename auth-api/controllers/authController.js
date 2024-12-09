const User = require('../models/user'); // Importa o modelo do usuário
const bcrypt = require('bcryptjs'); // Importa bcrypt para hash de senhas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para criar tokens JWT

// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { username, password } = req.body; // Pega dados do corpo da requisição

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10); // O número 10 representa o "salt rounds" para tornar o hash mais seguro

        // Cria um novo usuário com nome de usuário e senha criptografada
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save(); // Salva o usuário no banco de dados

        res.status(201).json({ message: 'Usuário registrado com sucesso!' }); // Responde com sucesso
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar o usuário' }); // Responde com erro
    }
};

// Função para fazer login de usuários
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Cria o token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ token }); // Retorna o token JWT para o frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};