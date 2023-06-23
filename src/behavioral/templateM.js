//Classe pai do template method, com os métodos abstratos. 
//Tal classe será usada pela classe AppTemplate
class TemplateM {
    configurarServidor(){
       throw new Error("Método configurarServidor deve ser implementado pelas subclasses.");
    }

    configurarBancoDeDados(){
       throw new Error("Método configurarBancoDeDados deve ser implementado pelas subclasses.");
    }

    configurarControladores(){
       throw new Error("Método configurarControladores deve ser implementado pelas subclasses.");
    }

    configurarComandos(){
        throw new Error("Método configurarComandos deve ser implementado pelas subclasses.");
    }

    configurarMemento(){
        throw new Error("Método configurarMemento deve ser implementado pelas subclasses.");
    }
    
    iniciar(){
        this.configurarServidor();
        this.configurarBancoDeDados();
        this.configurarControladores();
        this.configurarComandos();
        this.configurarMemento();
    }
}

module.exports = TemplateM;