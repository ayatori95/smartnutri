const receitasController = {
  async receitasId(req, res) {
    const id = req.params.id;
    const sql = `SELECT restricao, objetivo FROM usuarios WHERE idusuarios = ${id}`;
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Erro ao buscar restrições e objetivos do usuário");
      } else {
        console.log("Restrição e Objetivos encontrados!");
        const usuario = result[0]; // assume que há apenas um usuário com o ID especificado
        const restricao = usuario.restricao;
        const objetivo = usuario.objetivo;
        const sql1 = `SELECT * FROM receitas WHERE restricao = '${restricao}' AND objetivo = '${objetivo}'`;
        bancoDeDados.query(sql1, (err, result) => {
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
  receitas(req, res) {
    const sql = "SELECT * FROM receitas"
    bancoDeDados.query(sql, (err, result) => {
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
