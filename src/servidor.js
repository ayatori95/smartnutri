const porta = 3003

const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const bancoDeDados = require('./bancoDeDados')
const receitas = require('./receitas.json')
const filtrarReceitas = require('./filtrarReceitas');

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
});

app.get('/receitas', (req, res,next) => {
    //res.json(receitas)
    const restricoes = bancoDeDados.getUsuario(req.params.restricoes);
    const objetivos = bancoDeDados.getUsuario(req.params.objetivos);
    const receitas = req.json(receitas);
  
    const receitasFiltradas = filtrarReceitas(restricoes, objetivos, receitas);
  
    res.json(receitasFiltradas);
})

app.listen(porta, () =>{
    console.log(`Servidor execultando na porta ${porta}`)
})