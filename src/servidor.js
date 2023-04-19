const porta = 3003

const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const bancoDeDados = require('./bancodedados.js')


app.use(bodyParse.urlencoded({extended:true}));

app.get('/usuarios', (req, res,next) => { // caso utilizar use no lugar de get, qualquer url irá responder a requisição
    const sql = 'SELECT * FROM usuarios';
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar usuários');
      } else {
        console.log('Usuários encontrados!');
        res.status(200).send(result);
      }
    });
})

app.get('/usuarios/:id', (req,res, next) => {
    const id = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE idusuarios = ${id}`;
    bancoDeDados.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar usuário');
        } else {
            console.log('Usuário encontrado!');
            res.status(200).send(result);
        }
    });
})

app.post('/usuarios', (req, res, next) => {
    const usuarios = bancoDeDados.query('INSERT INTO usuarios (nome, idade, genero, altura, peso, restricao, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [req.body.nome, req.body.idade, req.body.genero, req.body.altura, req.body.peso, req.body.restricao, req.body.objetivo], 
    (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).send('Erro ao salvar usuário');
        } else {
            console.log('Usuário salvo com sucesso!');
            res.status(200).send(results);
        }
    });
});

app.get('/receitas/:id', async function (req, res, next) {
    const id = req.params.id;
    const sql = `SELECT restricao, objetivo FROM usuarios WHERE idusuarios = ${id}`;
    bancoDeDados.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar restrições e objetivos do usuário');
        } else {
            console.log('Restrição e Objetivos encontrados!');
            const usuario = result[0]; // assume que há apenas um usuário com o ID especificado
            const restricao = usuario.restricao;
            const objetivo = usuario.objetivo;
            const sql1 = `SELECT * FROM receitas WHERE restricao = '${restricao}' AND objetivo = '${objetivo}'`;
            bancoDeDados.query(sql1, (err, result) => {
                if (err) {
                console.log(err);
                 res.status(500).send('Erro ao buscar receitas');
                } else {
                console.log('Receitas encontrados!');
                res.status(200).send(result);
                }
            });
        }
    });
});

app.get('/receitas', (req, res,next) => {
    const sql = 'SELECT * FROM receitas';
    bancoDeDados.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar receitas');
      } else {
        console.log('Receitas encontrados!');
        res.status(200).send(result);
      }
    });
})

app.listen(porta, () =>{
    console.log(`Servidor execultando na porta ${porta}`)
})