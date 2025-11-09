# Provolx Frontend

This is the frontend for the Provolx AI-Powered Customer Service Platform.

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Select this frontend directory as the root
3. Vercel will automatically detect the Vite project and configure the build settings
4. Add the required environment variables in the Vercel dashboard:
   - `GEMINI_API_KEY` - Your Gemini API key
   - `GEMINI_MODEL` - The Gemini model to use (default: gemini-pro)

## Development

To run the development server:

```bash
npm install
npm run dev
```

## Build

To build the project for production:

```bash
npm run build
```

The build output will be in the `dist` directory.