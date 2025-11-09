import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { generateResponse, generateChatResponse } from './geminiClient';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Provolx AI Service is running' });
});

// API endpoint for generating responses
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const response = await generateResponse(prompt);
    return res.json({ response });
  } catch (error) {
    console.error('Error in /api/generate:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
});

// API endpoint for chat conversations
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = await generateChatResponse(history || [], message);
    return res.json({ response });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`AI Service running on port ${PORT}`);
});

export default app;