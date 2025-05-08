const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');
const { authenticateToken } = require('../middleware/auth');

// Rotas protegidas por autenticação
router.use(authenticateToken);

// Enviar mensagem de texto
router.post('/send-message', whatsappController.sendMessage);

// Enviar imagem
router.post('/send-image', whatsappController.sendImage);

// Enviar template
router.post('/send-template', whatsappController.sendTemplate);

// Validar número de telefone
router.get('/validate/:phoneNumber', whatsappController.validatePhoneNumber);

module.exports = router; 