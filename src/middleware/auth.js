const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const validateWebhook = (req, res, next) => {
  if (!req.headers['x-hub-signature']) {
    return res.status(403).json({ error: 'Sem assinatura válida' });
  }
  // Implementar verificação da assinatura
  next();
};

module.exports = {
  authenticateToken,
  validateWebhook
}; 