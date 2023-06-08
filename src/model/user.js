const DatabaseService = require('../services/bancodedadosServicos');

const databaseService = new DatabaseService();

databaseService.connection((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  const createUsuariosTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      idusuarios INT PRIMARY KEY AUTO_INCREMENT,
      nome VARCHAR(255) NOT NULL,
      idade INT NOT NULL,
      genero VARCHAR(255) NOT NULL,
      altura FLOAT NOT NULL,
      peso FLOAT NOT NULL,
      restricao VARCHAR(255) NOT NULL,
      objetivo VARCHAR(255) NOT NULL
    );
  `;

  const createReceitasTable = `
    CREATE TABLE IF NOT EXISTS receitas (
      idreceitas INT PRIMARY KEY AUTO_INCREMENT,
      restricao VARCHAR(255) NOT NULL,
      objetivo VARCHAR(255) NOT NULL,
      nome VARCHAR(255) NOT NULL,
      ingredientes TEXT NOT NULL,
      modo_preparo TEXT NOT NULL
    );
  `;

  databaseService.query(createUsuariosTable, (err) => {
    if (err) {
      console.error('Erro ao criar tabela "usuarios":', err);
      return;
    }
    console.log('Tabela "usuarios" criada com sucesso.');
  });

  databaseService.query(createReceitasTable, (err) => {
    if (err) {
      console.error('Erro ao criar tabela "receitas":', err);
      return;
    }
    console.log('Tabela "receitas" criada com sucesso.');
  });

  databaseService.end();
});