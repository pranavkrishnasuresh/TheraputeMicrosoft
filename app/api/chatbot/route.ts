import { OpenAI } from 'openai';


export async function POST(req: Request){
  const prompt = await req.json()

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const GPTresponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt.prompt,
          },
        ],
        max_tokens: 100,
      });

      console.log(JSON.stringify(GPTresponse.choices[0].message.content));

      return new Response(JSON.stringify(GPTresponse.choices[0].message.content));

    } catch (error) {
      console.error('Error generating response:', error);
    }

    return new Response(JSON.stringify(prompt));

}

// export async function POST(req: Request) {
//    const prompt = await req.json()
//     try {
//       const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//       const GPTresponse = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'user',
//             content: prompt,
//           },
//         ],
//         max_tokens: 10,
//       });

//       return new Response(GPTresponse.choices[0].message.content);

//     } catch (error) {
//       console.error('Error generating response:', error);
//       res.status(700).json({ success: false, message: 'Error generating response', error: error.message });
//     }
//   } 
