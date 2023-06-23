class Builder {
    // Classe pai que define os métodos abstratos para construção
    setRestricao(restricao) {
      throw new Error("Método setRestricao precisa ser implementado na classe filha");
    }
  
    setObjetivo(objetivo) {
      throw new Error("Método setObjetivo precisa ser implementado na classe filha");
    }
  
    build() {
      throw new Error("Método build precisa ser implementado na classe filha");
    }
  }