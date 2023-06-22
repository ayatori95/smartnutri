const mysql = require('mysql2/promise');
//Aqui se é feito o encapsulamento lógico necessário para interagir com o banco de dados
class DatabaseService {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'username',
      password: 'password',
      database: 'database_name',
    });
  }

  async connection() {
    try {
      await this.connection.connect();
      console.log('Conectado ao banco de dados com sucesso!');
    } catch (error) {
      throw new Error('Erro ao conectar ao banco de dados');
    }
  }

  async query(sql, values) {
    try {
      const result = await this.connection.query(sql, values);
      return result;
    } catch (error) {
      throw new Error('Erro ao executar query no banco de dados');
    }
  }

  async end() {
    try {
      await this.connection.end();
      console.log('Conexão com o banco de dados encerrada com sucesso!');
    } catch (error) {
      throw new Error('Erro ao encerrar conexão com o banco de dados');
    }
  }


  async criarUsuario(userData) {
    try { //ESTOU EM DÚVIDA QUANTO A FORAM QUE SE USA ESTE 'query' que também é usado nos controller, É UM MÉTODO ou apenas UM PEDIDO DE DADOS?
      const result = await this.connection.query("INSERT INTO usuarios (nome, idade, genero, altura, peso, restricao, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)", userData);
      return result;
    } catch (error) {
      throw new Error('Erro ao criar usuário no banco de dados');
    }
  }

  async pesquisarUsuario(userData) {
    try {
      const result = await this.connection.query("SELECT * FROM usuarios WHERE idusuarios = ?", userData);
      return result;
    } catch (error) {
      throw new Error('Erro ao pesquisar usuário no banco de dados');
    }
  }

  async selecionarUsuarios() {
    try { 
      const result = await this.connection.query("SELECT * FROM usuarios");
      return result;
    } catch (error) {
      throw new Error('Erro ao retornar lista de usuários no banco de dados');
    }
  }

  async caracteristicasUsuario(id) {
    try { 
      const result = await this.connection.query(`SELECT restricao, objetivo FROM usuarios WHERE idusuarios = ${id}`, id);
      return result;
    } catch (error) {
      throw new Error('Erro ao retornar caracteristicas do usuário no banco de dados');
    }
  }

  async listaReceitas() {
    try { 
      const result = await this.connection.query("SELECT * FROM receitas");
      return result;
    } catch (error) {
      throw new Error('Erro ao retornar caracteristicas do usuário no banco de dados');
    }
  }

  async listaReceitasUser(objetivo, restricao) {
    try { 
      const result = await this.connection.query("SELECT * FROM receitas WHERE restricao = ? AND objetivo = ?", [objetivo, restricao]);
      return result;
    } catch (error) {
      throw new Error('Erro ao retornar caracteristicas do usuário no banco de dados');
    }
  }

  async configurar (){//configurar() é devido ao templateMethod
    try{
      this.connection;
      console.log('Banco de dados configurado com sucesso!');
    }catch (error){
      throw new Error('Erro ao configurar o banco de dados');
    }
  
  }
}

module.exports = DatabaseService;