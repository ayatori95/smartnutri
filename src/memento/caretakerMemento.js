const Memento = require('./defaultMemento.js');
//implementa a lista de estados 
class Caretaker{  //retirei o export default
    constructor(){
        this.mementos = [];
    }

    addMemento(memento){// adiciona a lista
        this.mementos.push(memento);
    }
        
    getMemento(index){ // pega o estado especifico
        return this.mementos[index];
    }    
}
//exportando a classe Caretaker
module.exports = Caretaker; 