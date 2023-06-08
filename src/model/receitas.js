const DatabaseService = require('../services/bancodedadosServicos');

const databaseService = new DatabaseService();

class ReceitaModel {
  static criarReceitas(receitas, callback) {
    databaseService.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        callback(err);
        return;
      }
      const queries = receitas.map((receita) => {
        return new Promise((resolve, reject) => {
          const sql = `INSERT INTO receitas (nome, objetivo, restricao, ingredientes, descricao) VALUES 
            ('${receita.nome}', '${receita.objetivo}', '${receita.restricao}', '${receita.ingredientes}', '${receita.descricao}')`;
            
          databaseService.query(sql, (err, result) => {
            if (err) {
              console.error('Erro ao criar receita:', err);
              reject(err);
            } else {
              console.log('Receita criada com sucesso.');
              resolve(result);
            }
          });
        });
      });

      Promise.all(queries)
        .then((results) => {
          databaseService.end();
          callback(null, results);
        })
        .catch((err) => {
          databaseService.end();
          callback(err);
        });
    });
  }
}

const receitas = [
    {
      nome: 'Salada de Quinoa',
      objetivo: 'Manter-se Saudável',
      restricao: 'Sem restrições',
      ingredientes: '1 xícara de quinoa cozida; 1 pepino médio cortado em cubos; 1 tomate médio cortado em cubos; 1/2 cebola roxa picada; 1 punhado de folhas de hortelã picadas; Suco de 1 limão; Azeite de oliva a gosto; Sal e pimenta a gosto.',
      descricao: 'Em uma tigela, misture a quinoa cozida, o pepino, o tomate, a cebola roxa e as folhas de hortelã. Tempere com suco de limão, azeite, sal e pimenta a gosto. Misture bem todos os ingredientes e sirva como acompanhamento ou prato principal.'
    },
    {
        nome: 'Wrap de Frango',
        objetivo: 'Ganho de Massa Muscular',
        restricao: 'Sem glúten',
        ingredientes: '2 folhas de alface; 2 tortilhas de milho sem glúten; 200g de peito de frango grelhado e desfiado; 1/2 abacate em fatias; 1/4 xícara de tomate em cubos; 1/4 xícara de cebola picada; Molho de iogurte light para acompanhar.',
        descricao: 'Monte os wraps colocando os ingredientes no centro de cada tortilha. Dobre as laterais para dentro e enrole bem apertado. Sirva com o molho de iogurte light.'
      },
      {
        nome: 'Sopa de Legumes',
        objetivo: 'Alimentação Saudável',
        restricao: 'Sem lactose',
        ingredientes: '1 cenoura em cubos; 1 abobrinha em cubos; 1 batata em cubos; 1 cebola picada; 2 dentes de alho picados; 1 litro de caldo de legumes caseiro; 1 colher de sopa de azeite de oliva; Sal e temperos a gosto.',
        descricao: 'Em uma panela, aqueça o azeite e refogue a cebola e o alho até dourar. Adicione os legumes e o caldo de legumes. Tempere com sal e temperos a gosto. Cozinhe em fogo médio até os legumes ficarem macios. Sirva quente.'
      },
      {
        nome: 'Bolo de Banana sem Glúten',
        objetivo: 'Sobremesa saudável',
        restricao: 'Sem glúten',
        ingredientes: '2 bananas maduras; 2 ovos; 1/4 xícara de óleo de coco; 1 xícara de farinha de amêndoa; 1/2 xícara de farinha de arroz; 1 colher de chá de fermento em pó; 1 colher de chá de canela em pó; Pitada de sal.',
        descricao: 'Preaqueça o forno a 180°C. Em um liquidificador, bata as bananas, ovos e óleo de coco até obter uma mistura homogênea. Em uma tigela, misture as farinhas, fermento, canela e sal. Adicione a mistura líquida aos ingredientes secos e mexa bem. Despeje a massa em uma forma untada e asse por cerca de 30-35 minutos. Deixe esfriar antes de servir.'
      },
      {
        nome: 'Smoothie de Frutas sem Lactose',
        objetivo: 'Lanche saudável',
        restricao: 'Sem lactose',
        ingredientes: '1 banana congelada; 1 xícara de morangos congelados; 1/2 xícara de leite de amêndoa; 1 colher de sopa de mel; 1 colher de chá de sementes de chia; Folhas de hortelã para decorar.',
        descricao: 'No liquidificador, adicione a banana, os morangos, o leite de amêndoa e o mel. Bata até obter uma consistência cremosa. Despeje o smoothie em um copo, polvilhe as sementes de chia por cima e decore com folhas de hortelã. Sirva imediatamente.'
      },
      {
        nome: 'Espaguete de Abobrinha',
        objetivo: 'Refeição leve',
        restricao: 'Vegetariano',
        ingredientes: '2 abobrinhas médias; 2 colheres de sopa de azeite de oliva; 2 dentes de alho picados; Sal e pimenta a gosto; Molho de tomate e queijo ralado para acompanhar.',
        descricao: 'Com um descascador de legumes, corte as abobrinhas em tiras finas para simular o espaguete. Aqueça o azeite em uma frigideira grande e refogue o alho até dourar. Adicione as tiras de abobrinha, tempere com sal e pimenta, e cozinhe por cerca de 2-3 minutos, mexendo ocasionalmente. Retire do fogo e sirva com molho de tomate e queijo ralado.'
      },
      {
        nome: 'Hambúrguer de Grão-de-Bico',
        objetivo: 'Refeição vegetariana',
        restricao: 'Vegetariano',
        ingredientes: '1 xícara de grão-de-bico cozido; 1 cebola pequena picada; 2 dentes de alho picados; 1/2 xícara de farinha de trigo; 1 colher de chá de cominho em pó; 1 colher de chá de páprica doce; Sal e pimenta a gosto; Óleo vegetal para fritar.',
        descricao: 'Em um processador de alimentos, adicione o grão-de-bico, a cebola, o alho, a farinha de trigo, o cominho, a páprica, o sal e a pimenta. Processe até obter uma massa homogênea. Modele a massa em forma de hambúrgueres. Em uma frigideira, aqueça o óleo vegetal e frite os hambúrgueres por cerca de 3-4 minutos de cada lado, até dourarem. Sirva com acompanhamentos de sua preferência.'
      },
      {
        nome: 'Pudim de Coco sem Lactose',
        objetivo: 'Sobremesa sem lactose',
        restricao: 'Sem lactose',
        ingredientes: '1 lata de leite de coco; 200ml de leite de amêndoa; 1/2 xícara de açúcar; 4 colheres de sopa de amido de milho; Coco ralado para decorar.',
        descricao: 'Em uma panela, misture o leite de coco, o leite de amêndoa, o açúcar e o amido de milho. Leve ao fogo médio, mexendo constantemente até engrossar. Despeje o pudim em taças individuais e deixe esfriar em temperatura ambiente. Leve à geladeira por pelo menos 2 horas. Antes de servir, decore com coco ralado.'
      },

      
  ];
  
  ReceitaModel.criarReceitas(receitas, (err, results) => {
    if (err) {
      console.error('Erro ao criar receitas:', err);
      // Trate o erro conforme necessário
    } else {
      console.log('Receitas criadas com sucesso:', results);
      // Faça algo com os resultados
    }
  });