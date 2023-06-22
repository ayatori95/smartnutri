const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const userRoutes = require('./routes/index');

class Servidor {
  configurar(){ 
    app.use(bodyParse.urlencoded({ extended: true }));

    // Use as rotas do arquivo userRoutes
    app.use(userRoutes);

    const porta = 3003;

    app.listen(porta, () => {
   console.log(`Servidor executando na porta ${porta}`);
    });
  }
}

module.exports = Servidor;