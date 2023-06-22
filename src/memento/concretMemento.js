//aqui deve estar declarado o getState de memento 
const Memento = require('./defaultMemento.js');
// vou ter que usar module exports aqui, para poder usar require desta classe em outros arquivos
class ConcreteMemento extends Memento{
    constructor(state){
        super(state);
    }

}
module.esports = ConcreteMemento;