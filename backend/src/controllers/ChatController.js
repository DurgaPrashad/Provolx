const Chat = require('../models/Chat');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ElevenLabsClient } = require("elevenlabs-node");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyC5g3oAnAsVUlNX3510wLgD60o_LiVdD5E');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Initialize Eleven Labs
const elvenLabsClient = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY || 'your_eleven_labs_api_key_here'
});

// Create a new chat session
const createChatSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const chat = new Chat({
      userId,
      sessionId: uuidv4(),
      messages: []
    });
    
    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a message to chat session and get AI response
const addMessageToChat = async (req, res) => {
  try {
    const { sessionId, role, content } = req.body;
    
    const chat = await Chat.findOne({ sessionId });
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    // Add user message to chat
    chat.messages.push({ role, content });
    
    // If it's a user message, generate AI response
    if (role === 'user') {
      try {
        // Prepare chat history for context
        const history = chat.messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: msg.content
        }));
        
        // Generate AI response
        const result = await model.generateContent(content);
        const response = await result.response;
        const aiResponse = response.text();
        
        // Add AI response to chat
        chat.messages.push({ role: 'assistant', content: aiResponse });
      } catch (aiError) {
        console.error('AI generation error:', aiError);
        // Add error response to chat
        chat.messages.push({ role: 'assistant', content: 'Sorry, I encountered an error processing your request.' });
      }
    }
    
    const updatedChat = await chat.save();
    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const chat = await Chat.findOne({ sessionId });
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for a user
const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate speech from text
const generateSpeech = async (req, res) => {
  try {
    const { text } = req.body;
    
    const audio = await elvenLabsClient.textToSpeech({
      text: text,
      voiceId: "21m00Tcm4TlvDq8ikWAM", // Default voice
      modelId: "eleven_monolingual_v1",
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.5
      }
    });
    
    res.set('Content-Type', 'audio/mpeg');
    audio.pipe(res);
  } catch (error) {
    console.error('Text-to-speech error:', error);
    res.status(500).json({ message: 'Failed to generate speech' });
  }
};

module.exports = {
  createChatSession,
  addMessageToChat,
  getChatHistory,
  getUserChats,
  generateSpeech
};