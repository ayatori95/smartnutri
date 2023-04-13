const porta = 3003

const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const fs = require('fs');
const bancoDeDados = require('./bancoDeDados')
const receitas = require('./receitas.json')
const receitasFiltradas = require('./openai');

app.use(bodyParse.urlencoded({extended:true}))

app.get('/usuarios', (req, res,next) => { // caso utilizar use no lugar de get, qualquer url irá responder a requisição
    res.send(bancoDeDados.getUsuarios()) //Converte para JSON
})

app.get('/usuarios/:id', (req,res, next) => {
    res.send(bancoDeDados.getUsuario(req.params.id))
})

app.post('/usuarios', (req, res, next) => {
    const usuarios = bancoDeDados.salvarUsuario({
        nome: req.body.nome,
        idade: req.body.idade,
        genero: req.body.genero,
        altura: req.body.altura,
        peso: req.body.peso,
        restricao: req.body.restricao,
        objetivo: req.body.objetivo
        
    })
    res.send(usuarios) // JSON
})

app.get('/receitas/:id', (req, res, next) => {
    const id = req.params.id;
    const receita = receitas.find(r => r.id === id);
    
    if (!receita) {
      return res.status(404).send('Receita não encontrada');
    } else {
        res.json(receita);
    }

   //const idUsuario = req.params.id;
   //const restricoes = bancoDeDados.getUsuario(idUsuario).restricoes;
   //const objetivos = bancoDeDados.getUsuario(idUsuario).objetivos;
   //const receita = JSON.parse(fs.readFileSync('./src/receitas.json', 'utf-8'));
   //const receitasFiltradas = filtrarReceitas.filtrarReceitas(restricoes, objetivos, receita);

    
});

app.get('/receitas', (req, res,next) => {
    res.json(receitas)
})

app.listen(porta, () =>{
    console.log(`Servidor execultando na porta ${porta}`)
})