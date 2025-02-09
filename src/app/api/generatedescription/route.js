import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received request for random quotes');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Generate a random inspirational quote";

    try {
      const result = await model.generateContent(prompt);
      const text = result.response ? await result.response.text() : '';
      console.log('API response text:', text);
      const description = text || '';
      const hashtags = description.match(/#\w+/g) || [];

      return res.status(200).json({ description, hashtags });
    } catch (error) {
      console.error('Error generating description:', error);
      return res.status(500).json({ error: 'Failed to generate description' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
