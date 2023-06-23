const DatabaseService = require('../services/bancodedadosServicos');
const databaseService = new DatabaseService();

// Função decoradora para tratamento de erros no controller
function withErrorHandling(controllerFunction) {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro no servidor");
    }
  };
}

const userController = {
  // Função para exibir todos os usuários
  exibirUsuarios: withErrorHandling((req, res) => {
    const sql = "SELECT * FROM usuarios";
    databaseService.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar usuários");
      } else {
        console.log("Usuários encontrados!");
        res.status(200).send(result);
      }
    });
  }),

  // Função para exibir um usuário específico
  exibirUsuario: withErrorHandling(async (req, res) => {
    const userData = req.params.id;
    const result = await databaseService.pesquisarUsuario(userData);
    console.log("Usuário encontrado!");
    res.status(200).send(result);
  }),

  // Função para salvar um usuário
  salvarUsuario: withErrorHandling(async (req, res) => {
    const userData = [
      req.body.nome,
      req.body.idade,
      req.body.genero,
      req.body.altura,
      req.body.peso,
      req.body.restricao,
      req.body.objetivo,
    ];

    await databaseService.createUser(userData);
    console.log("Usuário salvo com sucesso!");
    res.status(200).send(results);
  }),
};

module.exports = userController;