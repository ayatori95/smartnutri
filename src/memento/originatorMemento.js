
const Memento = require('./defaultMemento.js');

export default class Originator{
    constructor(){
        this.state = null;
    }
    
    creatMemento(){
        return new Memento(this.state);
    }

    restoreMemento(memento){
        this.state = memento.getState();
    }
}