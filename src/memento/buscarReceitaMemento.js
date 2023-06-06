// import BuscarReceitasCommand from '../command/buscarReceitasCommand'
const Command = require('../command/command');
const Memento = require('./defaultMemento.js');
const Originator = requeire('./originatorMemento.js');
const Caretaker = require('./caretakerMemento');
// Classe BuscarReceitasCommand representa o comando para buscar receitas com base em um ID de usuário
class BuscarReceitasCommand extends Command {
    constructor(id) {
      super();
      this.id = id;
      //NAO VI onde esta declarado o 'res', penso que precisa usar ele como parametro do construtor, para o mesmo poder ser usado
      //sem ter erro ou declarar dentro bancoDeDados() abaixo  
      this.res= res; // Agora quando for instanciar o objeto do resultado, tem que fornece o res também
      this.carataker = new Caretaker();
    }
  
    // Método execute é responsável por executar o comando
    execute() {
      const id = this.id;
      const res = this.res; //adicionando a variável res ao método
      const sql = `SELECT restricao, objetivo FROM usuarios WHERE idusuarios = ${id}`;
      const originator = new Originator();

      // Executa a consulta SQL para buscar as restrições e objetivos do usuário
      bancoDeDados.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erro ao buscar restrições e objetivos do usuário");
        } else {
          console.log("Restrição e Objetivos encontrados!");
          const usuario = result[0];
          const restricao = usuario.restricao;
          const objetivo = usuario.objetivo;
          const sql1 = `SELECT * FROM receitas WHERE restricao = '${restricao}' AND objetivo = '${objetivo}'`;
          // Executa a consulta SQL para buscar as receitas correspondentes às restrições e objetivos do usuário
          bancoDeDados.query(sql1, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Erro ao buscar receitas");
            } else {
              console.log("Receitas encontradas!");
              res.status(200).send(result);
            }
          });
        }
      });
       //crio um memento 
       const state = {id: this.id};
       const memento = originator.creatMemento(state);
       this.carataker.addMemento(memento);
    }
  }


  // Classe SalvarUsuarioCommand representa o comando para salvar um usuário
  class SalvarUsuarioCommand extends Command {
    constructor(userData, res) {
      super();
      this.userData = userData;
      this.res = res; 
      this.memento = null;
    }
  
    // Método execute é responsável por executar o comando
    execute() {
      const userData = this.userData;
      const res = this.res; //adicionando a variável res ao método
      // Chama o serviço do banco de dados para criar o usuário
      this.criarMemento(); // referencia ao método abaixo
      databaseService.createUser(userData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(400).send("Erro ao salvar usuário");
        } else {
          console.log("Usuário salvo com sucesso!");
          res.status(200).send(results);
        }
      });
    }

    criarMemento(){// encapsula o estado atual para poder ser restaurado posteriormente
        const state = {userData: this.userData, res: this.res};
        this.memento = new Memento(state);// adiciona memento a lista e o mantem
    }
  }
//Permite pegar as classes e usar no memento
  export { BuscarReceitasCommand, SalvarUsuarioCommand};