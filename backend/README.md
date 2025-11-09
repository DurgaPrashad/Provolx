# Provolx Backend Service

This service handles all backend functionality for the Provolx platform using MongoDB.

## Features

- MongoDB database integration
- User data management
- Chat history storage
- Analytics data collection

## Setup

1. Ensure you have the required environment variables in the `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   MONGODB_DB_NAME=provolx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the service:
   ```bash
   npm run dev
   ```

## Database Schema

The backend uses the following collections:
- `users`: User information
- `chats`: Chat history
- `analytics`: Usage analytics
- `feedback`: User feedback on AI responses

## API

The service provides RESTful endpoints for:
- User management
- Chat operations
- Analytics collection
- Feedback submission