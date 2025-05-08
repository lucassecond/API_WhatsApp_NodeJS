const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Rota para enviar mensagem
router.post('/send', messageController.send);

// Rota para obter mensagens de um contato
router.get('/:phoneNumber', messageController.getByPhone);

module.exports = router; 