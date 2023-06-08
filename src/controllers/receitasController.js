const DatabaseService = require('../services/bancodedadosServicos');

const databaseService = new DatabaseService();

const receitasController = {
  async receitasId(req, res) {
    const id = req.params.id;
    await databaseService.caracteristicasUsuario(id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Restrição e Objetivos encontrados!");
        const usuario = result[0]; // assume que há apenas um usuário com o ID especificado
        const restricao = usuario.restricao;
        const objetivo = usuario.objetivo;
        databaseService.listaReceitasUser([restricao,objetivo], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar receitas");
          } else {
            console.log("Receitas encontrados!");
            res.status(200).send(result);
          }
        });
      }
    });
  },
  async receitas(req, res) {
    await databaseService.listaReceitas((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar receitas");
      } else {
        console.log("Receitas encontrados!");
        res.status(200).send(result);
      }
    })
  },
};
 //exporta o valor direto de receitasController para poder ser importado em outros arquivos
module.exports = receitasController;