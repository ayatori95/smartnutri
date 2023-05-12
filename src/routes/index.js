const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota GET para exibir uma página inicial
router.get('/', userController.exibirPaginaInicial);

// Rota POST para processar um formulário
router.post('/processar-formulario', exemploController.processarFormulario);

module.exports = router;