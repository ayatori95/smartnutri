const mysql = require('mysql2');
//cria a conexão com o banco de dados mysql usando uma conexão exportada para 'mysql2'
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

module.exports = connection;