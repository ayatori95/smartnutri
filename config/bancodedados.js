const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'smartnutri'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conexão bem-sucedida!');
  });

connection.query('INSERT INTO smartnutri.usuarios (nome, idade, genero, altura, peso, restricao, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)', ['marcelo', 34, 'masculino', 1.70, 85, "vegano", 'emagrecer'], function (err, result) {
    if (err) throw err;
    console.log('Dados inseridos com sucesso!');
});