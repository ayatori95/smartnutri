const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser')
const userController = require('../controllers/userController');

router.use(bodyParse.urlencoded({extended:true}));

// Rota GET para exibir uma lista de usuários
router.get('/usuarios', userController.exibirUsuarios);

// Rota GET para exibir um usuário específico
router.get('/usuario/:id', userController.exibirUsuario);

// Rota POST para salvar um usuário
router.post('/usuarios', userController.salvarUsuario);

module.exports = router;