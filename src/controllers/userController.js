const userController = {
  exibirUsuarios(req, res) {
    const sql = "SELECT * FROM usuarios";
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
  exibirUsuario(req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE idusuarios = ${id}`;
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar usuário");
      } else {
        console.log("Usuário encontrado!");
        res.status(200).send(result);
      }
    });
  },
  salvarUsuario(req, res) {
    const usuarios = bancoDeDados.query(
      "INSERT INTO usuarios (nome, idade, genero, altura, peso, restricao, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.nome,
        req.body.idade,
        req.body.genero,
        req.body.altura,
        req.body.peso,
        req.body.restricao,
        req.body.objetivo,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(400).send("Erro ao salvar usuário");
        } else {
          console.log("Usuário salvo com sucesso!");
          res.status(200).send(results);
        }
      }
    );
  },
};

module.exports = userController;
