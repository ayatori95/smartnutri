class ReceitaBuilder extends Builder {
  constructor() {
    super();
    this.restricao = null;
    this.objetivo = null;
  }

  setRestricao(restricao) {
    this.restricao = restricao;
    return this;
  }

  setObjetivo(objetivo) {
    this.objetivo = objetivo;
    return this;
  }

  build() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM receitas WHERE restricao = '${this.restricao}' AND objetivo = '${this.objetivo}'`;
      // Executa uma consulta SQL no banco de dados para buscar as receitas com base nas restrições e objetivos definidos
      bancoDeDados.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          reject("Erro ao buscar receitas");
        } else {
          console.log("Receitas encontradas!");
          resolve(result);
        }
      });
    });
  }
}

const receitasController = {
  async receitasId(req, res) {
    const id = req.params.id;
    const sql = `SELECT restricao, objetivo FROM usuarios WHERE idusuarios = ${id}`;
    // Busca as restrições e objetivos do usuário no banco de dados
    bancoDeDados.query(sql, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar restrições e objetivos do usuário");
      } else {
        console.log("Restrição e Objetivos encontrados!");
        const usuario = result[0]; // Assume que há apenas um usuário com o ID especificado
        const restricao = usuario.restricao;
        const objetivo = usuario.objetivo;

        try {
          // Utiliza o ReceitaBuilder para buscar as receitas com base nas restrições e objetivos do usuário
          const receitas = await new ReceitaBuilder()
            .setRestricao(restricao)
            .setObjetivo(objetivo)
            .build();

          res.status(200).send(receitas);
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      }
    });
  },

  receitas(req, res) {
    const sql = "SELECT * FROM receitas";
    // Busca todas as receitas no banco de dados
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

module.exports = receitasController;