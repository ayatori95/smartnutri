const Servidor = require ('../servidor');
const BancoDeDadosServicos = require ('../services/bancodedadosServicos');
const IndexRoutes = require ('../routes/index');
//const UserController = require ('../controllers/userController');
//const ReceitasController = require ('../controllers/receitasController');
const BuscarReceitasCommand = require ('../command/buscarReceitasCommand');
const ReceitasMemento = require ('../memento/receitasMemento');

class AppTemplate {
    configurarServidor(){
        //configurar o servidor
        const servidor = new Servidor();
        servidor.configurar();
    }
    
    configurarBancoDeDados(){
        //configurar o banco de dados
        const bancodedadosServicos = new BancoDeDadosServicos();
        bancoDeDadosServicos.configurar();
    }

    configurarControladores(){
        //configurar os controllers por meio do index das rotas
        const indexRotas = new IndexRoutes();
        indexRotas.configurarRotas();
    }

    configurarComandos(){
        //configurar o comando de receirtas
        const buscarReceitasCommand = new BuscarReceitasCommand();
        buscarReceitasCommand.configurar();
    }

    configurarMemento(){
        // configurar o memento
        const receitasMemento = new ReceitasMemento();
        receitasMemento.configurar();
    }

    iniciar(){
        this.configurarServidor();
        this.configurarBancoDeDados();
        this.configurarControladores();
        this.configurarComandos();
        this.configurarMemento();
    }
}

module.exports = AppTemplate;