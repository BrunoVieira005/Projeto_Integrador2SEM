const jwt = require('jsonwebtoken');

// Middleware de autenticação
const authenticate = (req, res, next) => {
    const token = req.header('Authorization'); // Pega o token no cabeçalho

    if (!token) {
        return res.status(403).json({ message: 'Token de autenticação não encontrado' });
    }

    try {
        // Remove o prefixo 'Bearer ' e valida o token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados decodificados ao objeto req
        next(); // Continua a execução
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authenticate;