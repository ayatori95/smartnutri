function filtrarReceitas(restricoes, objetivos, receita) {
    // cria um array vazio para as receitas filtradas
    const receitasFiltradas = [];
  
    // loop pelas receitas
    for (let i = 0; i < receita.length; i++) {
      const receita = receita[i];
      let atendeRestricoes = true;
      let atendeObjetivos = false;
  
      // loop pelas restrições
      for (let j = 0; j < restricoes.length; j++) {
        const restricao = restricoes[j];
        if (receita.ingredientes.includes(restricao)) {
          atendeRestricoes = false;
          break;
        }
      }
  
      // loop pelos objetivos
      for (let k = 0; k < objetivos.length; k++) {
        const objetivo = objetivos[k];
        if (receita.tags.includes(objetivo)) {
          atendeObjetivos = true;
          break;
        }
      }
  
      // se a receita atende a todas as restrições e pelo menos um dos objetivos, adicione-a ao array de receitas filtradas
      if (atendeRestricoes && atendeObjetivos) {
        receitasFiltradas.push(receita);
      }
    }
  
    return receitasFiltradas;
  }

module.exports = {filtrarReceitas}
