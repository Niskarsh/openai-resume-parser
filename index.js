const OpenAI = require("openai");
const { extractTextFromPDF } = require('./text-extractor.js');

let YOUR_OPENAI_API_KEY = 'sk-proj-kZEyMGajVyEv88HtzZrRT3BlbkFJUPbe1jcVfFNJ7CRc6sJa';

const openai = new OpenAI({
  apiKey: YOUR_OPENAI_API_KEY,
});

const extractWorkExperience = async ({ text }) => {
  const prompt = `Extract the work experience section from the following resume and structure it in JSON format with keys "company", "position", "start_date", "end_date", "duration", and "description":\n\n${text}`;

//   const response = await openai.createCompletion({
//     model: "gpt-4",
//     prompt: prompt,
//     max_tokens: 1000,
//     temperature: 0.5,
//   });

//   return response.data.choices[0].text.trim();


  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
};

async function test(filePath) {
    let text = await extractTextFromPDF({ filePath });
    await extractWorkExperience({ text });
    // console.log(output);
}

test('./data1.pdf')