const porta = 3003

const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const fs = require('fs');
const bancoDeDados = require('./bancoDeDados')
const receitas = require('./receitas.json')
const ReceitasFiltradas = require('./openai');

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

app.get('/receitas/:id', async function (req, res, next) {
    const receitasFiltradas = new ReceitasFiltradas();
    const idUsuario = req.params.id;
    const restricoes = bancoDeDados.getUsuario(idUsuario).restricoes;
    const objetivos = bancoDeDados.getUsuario(idUsuario).objetivos;

    let text = await receitasFiltradas.get(JSON.stringify(req.query.restricoes))

    res.send(text.map(item => {
        return `${item.text}`;
    }).join(''));

   //const receita = JSON.parse(fs.readFileSync('./src/receitas.json', 'utf-8'));
   //const receitasFiltradas = filtrarReceitas.filtrarReceitas(restricoes, objetivos, receita);

    
});

app.get('/receitas', (req, res,next) => {
    res.json(receitas)
})

app.listen(porta, () =>{
    console.log(`Servidor execultando na porta ${porta}`)
})