
const Memento = require('./defaultMemento.js');

class Originator{
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

module.exports = Originator;