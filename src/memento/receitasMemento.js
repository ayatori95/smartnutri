const BuscarReceitasCommand = require ('../command/buscarReceitasCommand');
const bancoDeDados = require('../services/bancodedados');
const Memento = require('./defaultMemento');
const Originator = require('./originatorMemento');

const receitasMemento = {
    memento: null,

    async receitasId(req,res){
        const id = req.params.id;
        const buscarReceitasCommand = new BuscarReceitasCommand(id);

        const state = {id: id}; // guarda o id em um estado
        this.memento = new Memento(state);
        const originator = new Originator();
        this.memento = originator.createMemento(state);
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