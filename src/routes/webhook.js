const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const { validateWebhook } = require('../middleware/auth');

// Rota de verificação do webhook
router.get('/', webhookController.verify);

// Rota para receber mensagens
router.post('/', validateWebhook, webhookController.receive);

module.exports = router; 