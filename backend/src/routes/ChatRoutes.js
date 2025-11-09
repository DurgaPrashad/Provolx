const express = require('express');
const { 
  createChatSession, 
  addMessageToChat, 
  getChatHistory,
  getUserChats,
  generateSpeech
} = require('../controllers/ChatController');

const router = express.Router();

router.post('/create', createChatSession);
router.post('/message', addMessageToChat);
router.get('/history/:sessionId', getChatHistory);
router.get('/user/:userId', getUserChats);
router.post('/speech', generateSpeech);

module.exports = router;