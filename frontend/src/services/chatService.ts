const API_BASE_URL = 'http://localhost:3000/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  _id: string;
  userId: string;
  sessionId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Create a new chat session
export const createChatSession = async (userId: string): Promise<ChatSession> => {
  const response = await fetch(`${API_BASE_URL}/chat/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create chat session');
  }
  
  return response.json();
};

// Add a message to chat session
export const addMessageToChat = async (
  sessionId: string, 
  role: 'user' | 'assistant', 
  content: string
): Promise<ChatSession> => {
  const response = await fetch(`${API_BASE_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, role, content }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add message to chat');
  }
  
  return response.json();
};

// Get chat history
export const getChatHistory = async (sessionId: string): Promise<ChatSession> => {
  const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get chat history');
  }
  
  return response.json();
};

// Get all chats for a user
export const getUserChats = async (userId: string): Promise<ChatSession[]> => {
  const response = await fetch(`${API_BASE_URL}/chat/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get user chats');
  }
  
  return response.json();
};

// Generate speech from text
export const generateSpeech = async (text: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/chat/speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate speech');
  }
  
  return response.blob();
};