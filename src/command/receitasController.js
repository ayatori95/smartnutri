// Importa a classe BuscarReceitasCommand do arquivo ../commands/BuscarReceitasCommand
const BuscarReceitasCommand = require('../commands/BuscarReceitasCommand');
// Importa o serviço bancodedados do arquivo ../services/bancodedados
const bancoDeDados = require('../services/bancodedados');

// Objeto receitasController contém os métodos para lidar com as requisições relacionadas a receitas
const receitasController = {
  // Método assíncrono receitasId é responsável por buscar receitas com base em um ID de usuário
  async receitasId(req, res) {
    const id = req.params.id;
    // Cria uma nova instância de BuscarReceitasCommand, passando o ID como argumento
    const buscarReceitasCommand = new BuscarReceitasCommand(id);
    // Executa o comando BuscarReceitasCommand
    buscarReceitasCommand.execute();
  },
  
  // Método receitas é responsável por buscar todas as receitas
  receitas(req, res) {
    const sql = "SELECT * FROM receitas";
    // Executa a consulta SQL para buscar todas as receitas
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar receitas");
      } else {
        console.log("Receitas encontradas!");
        res.status(200).send(result);
      }
    });
  },
};

// Exporta o objeto receitasController para ser utilizado por outros arquivos
module.exports = receitasController;
