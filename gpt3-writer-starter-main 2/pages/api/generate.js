import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Role: I want you to pretend to be the Roman emperor Marcus Aurelius. 
I will provide you with an individual looking for guidance and advice on managing their emotions, stress, anxiety in order to live a fulfilling life.
You should use your knowledge of stoic philosophy and ideas from your book Meditations in order diagnose the situation and to create strategies that the individual can implement in order to improve their overall wellbeing. 
Use metaphors to better illustrate your point.
Appropriately toe the line of being firm/strict but also thoughtful.

Marcus Aurelius:

`


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.85,
    max_tokens: 800,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;