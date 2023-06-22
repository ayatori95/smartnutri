const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser')
const UserController = require('../controllers/userController');
const ReceitaController = require('../controllers/receitasController');

router.use(bodyParse.urlencoded({extended:true}));

class IndexRoutes{
    configurar(){
        this.configurarRouters();
    }
  
    configurarRotas(){//configurarRotas() é devido ao templateMethod

        //Controladores
        const userController = new UserController();
        const receitaController = new ReceitasController();

        // Rota GET para exibir uma lista de usuários
        router.get('/usuarios', userController.exibirUsuarios);

        // Rota GET para exibir um usuário específico
        router.get('/usuario/:id', userController.exibirUsuario);

        // Rota POST para salvar um usuário
        router.post('/usuarios', userController.salvarUsuario);

        // Rota get para exibir uma lista de receitas
        router.get('/receitas', receitaController.receitas);

        // Rota get para exibir receitas específicas do usuário
        router.get('/receita/:id', receitaController.receitasId);
    }     
}


module.exports = IndexRoutes;