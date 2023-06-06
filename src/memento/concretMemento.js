//aqui deve estar declarado o getState de memento 
const Memento = require('./defaultMemento.js');

export default class CooncreteMemento extends Memento{
    constructor(state){
        super(state);
    }

}