import DatabaseService from './bancodedadosServicos.js';

class DatabaseConnectionFactory {
    static createConnection() {
      const host = 'localhost';
      const username = 'username';
      const password = 'password';
      const database = 'database_name';
  
      return new DatabaseService(host, username, password, database);
    }
  }
  
  // Criação de múltiplas conexões
  const connection1 = DatabaseConnectionFactory.createConnection();
  connection1.connect();
  // Utilize a conexão 1
  
  const connection2 = DatabaseConnectionFactory.createConnection();
  connection2.connect();
   
  
  connection1.end();
  connection2.end();