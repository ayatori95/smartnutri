const mysql = require('mysql2/promise');

class DatabaseService {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'username',
      password: 'password',
      database: 'database_name',
    });
  }

  async criarUsuario(userData) {
    try {
      await this.connection.query("INSERT INTO usuarios (nome, idade, genero, altura, peso, restricao, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)", userData);
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

  // Outros métodos para acessar o banco de dados...
}

module.exports = DatabaseService;