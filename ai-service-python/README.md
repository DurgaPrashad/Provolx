# Provolx AI Service (Python Version)

This service handles all AI-related functionality for the Provolx platform using the Google Gemini API with graph visualization capabilities.

## Features

- Natural language processing with Gemini
- Chat response generation
- Context-aware conversations
- Data type detection for automotive data
- Graph and chart visualization generation
- CORS support for frontend integration

## Setup

1. Ensure you have the required environment variables in the `.env` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8001
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the service:
   ```bash
   python main.py
   ```

## API Endpoints

### Chat Endpoint
- `POST /chat` - Generate AI responses with optional visualizations
  Request body:
  ```json
  {
    "message": "Your question here",
    "token": "authentication_token",
    "sheetData": {
      "name": "Sheet Name",
      "columns": [{"name": "Column1"}, {"name": "Column2"}],
      "dataPreview": [["value1", "value2"], ["value3", "value4"]],
      "rowCount": 100
    },
    "conversation_history": [
      {"role": "user", "content": "Previous message"},
      {"role": "assistant", "content": "Previous response"}
    ]
  }
  ```

### Health Check
- `GET /health` - Check if the service is running

## Visualization Capabilities

The AI service can generate visualizations for data analysis:
- Histograms for numerical data
- Bar charts for categorical data
- Automatic chart selection based on data type
- Base64 encoded images returned in the response

## Data Type Detection

The service automatically detects the following data types:
- Automotive/Vehicle Data
- Service Records
- Customer Data
- Sales Data
- Inventory Data
- General Data

Each data type has specialized prompts for more accurate analysis.