const BuscarReceitasCommand = require ('../command/buscarReceitasCommand');
const bancoDeDados = require('../services/bancodedados');
const Memento = require('./defaultMemento');
const Originator = require('./originatorMemento');

const receitasMemento = {
    memento: null,

    configurar(){
        //vaizo devido a não haver uma configuração específica para tal método
      },
    
    async receitasId(req,res){
        const id = req.params.id;
        const buscarReceitasCommand = new BuscarReceitasCommand(id, res); // instanciando o res para poder ser usado posteriormente

        const state = {id: id}; // guarda o id em um estado
    
        const originator = new Originator();
        this.memento = new Memento(state); // criando um novo memento com base no estado do objeto
        originator.createMemento(this.memento.getState()); //uso do metodo createMemento em originator para se referir ao memento instanciado
        buscarReceitasCommand.execute(); //executando a busca de receitas
    },

    receitas(req, res){
        const sql = "SELECT * FROM receitas";
        bancoDeDados.query(sql, (err, result) =>{
            if (err){
                console.log(err);
                res.status(500).send("Erro ao buscar receitas");
            }else {
                console.log("Receitas encontradas!");
                res.status(200).send(result);
            }
        });
    },

    restoreState(){
        if(this.memento){
            const state = this.memento.getState();
            const originator = new Originator();
            originator.restoreMemento(state);
        }        
    }
};

module.exports = receitasMemento;