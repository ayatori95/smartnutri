const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
      apiKey: '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',
});
const openai = new OpenAIApi(configuration);
  
class ReceitasFiltradas {
    get = async (prompt) => {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 1000,
        });
        return response.data.choices;
    }
}

module.exports = ReceitasFiltradas;