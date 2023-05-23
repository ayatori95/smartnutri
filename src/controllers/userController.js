const DatabaseService = require('../services/bancodedadosServicos');

const databaseService = new DatabaseService();

const userController = {
  exibirUsuarios(req, res) {
    const sql = "SELECT * FROM usuarios";
    databaseService.query(sql, (err, result) => {    // de onde vem a variavel 'bancoDeDados'? Eu poderia usar o 'databaseService' que é uma instância de DatabaseService(); 
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar usuários");
      } else {
        console.log("Usuários encontrados!");
        res.status(200).send(result);
      }
    });
  },
  async exibirUsuario(req, res) {
    const userData = req.params.id;
    await databaseService.pesquisarUsuario(userData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar usuário");
      } else {
        console.log("Usuário encontrado!");
        res.status(200).send(result);
      }
    });
  },
  async salvarUsuario(req, res) {
    const userData = [req.body.nome,req.body.idade,req.body.genero,req.body.altura,req.body.peso,req.body.restricao,req.body.objetivo,];
    await databaseService.criarUsuario(userData, (err, results) => { //estava com o nome em inglês, creatUser --> criarUsario, agora pega o método dentro de bancodedadosServicos
        if (err) {
          console.log(err);
          res.status(400).send("Erro ao salvar usuário");
        } else {
          console.log("Usuário salvo com sucesso!");
          res.status(200).send(results);
        }
      });
  },
};

module.exports = userController;