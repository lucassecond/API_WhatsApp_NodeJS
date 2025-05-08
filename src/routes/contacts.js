const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Rota para listar contatos
router.get('/', contactController.list);

// Rota para adicionar contato
router.post('/', contactController.add);

module.exports = router; 