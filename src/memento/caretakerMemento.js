const Memento = require('./defaultMemento.js');
//implementa a lista de estados 
export default class Caretaker{
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