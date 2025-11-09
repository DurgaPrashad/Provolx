# Provolx AI Service

This service handles all AI-related functionality for the Provolx platform using the Gemini API.

## Features

- Natural language processing with Gemini
- Chat response generation
- Sentiment analysis
- Context-aware conversations

## Setup

1. Ensure you have the required environment variables in the `.env` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the service:
   ```bash
   npm run dev
   ```

## Usage

The service exports two main functions:
- `generateResponse(prompt: string)`: Generate a response for a single prompt
- `generateChatResponse(history: Array<{ role: string; parts: string }>, message: string)`: Generate a response in a chat context

## API

The service can be integrated with the main application through the exported functions in `geminiClient.ts`.