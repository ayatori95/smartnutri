// usei export para poder exportar em outros arquivos diretamento 
class Memento {
   constructor(state){
      this.state = state;
   }

   getState(){
      return this.state; // retorna o estado armazenado
  }
}

module.exports = Memento;