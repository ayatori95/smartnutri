// Importa a classe SalvarUsuarioCommand do arquivo "../commands/SalvarUsuarioCommand"
const SalvarUsuarioCommand = require('../commands/SalvarUsuarioCommand');
// Importa o serviço DatabaseService do arquivo "../services/DatabaseService"
const databaseService = require('../services/DatabaseService');

// Objeto userController contém os métodos para lidar com as requisições relacionadas a usuários
const userController = {
  // Método exibirUsuarios é responsável por buscar todos os usuários
  exibirUsuarios(req, res) {
    const sql = "SELECT * FROM usuarios";
    // Executa a consulta SQL para buscar todos os usuários
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar usuários");
      } else {
        console.log("Usuários encontrados!");
        res.status(200).send(result);
      }
    });
  },

  // Método assíncrono exibirUsuario é responsável por buscar um usuário com base em um ID de usuário
  async exibirUsuario(req, res) {
    const userData = req.params.id;
    // Chama o método pesquisarUsuario do serviço DatabaseService, passando userData como argumento
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

  // Método salvarUsuario é responsável por salvar um novo usuário
  salvarUsuario(req, res) {
    const userData = [
      req.body.nome,
      req.body.idade,
      req.body.genero,
      req.body.altura,
      req.body.peso,
      req.body.restricao,
      req.body.objetivo,
    ];
    // Cria uma nova instância de SalvarUsuarioCommand, passando userData como argumento
    const salvarUsuarioCommand = new SalvarUsuarioCommand(userData);
    // Executa o comando SalvarUsuarioCommand
    salvarUsuarioCommand.execute();
  },
};

// Exporta o objeto userController para ser utilizado por outros arquivos
module.exports = userController;

