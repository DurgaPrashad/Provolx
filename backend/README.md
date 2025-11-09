# Provolx Backend Service

This service handles all backend functionality for the Provolx platform using MongoDB.

## Features

- MongoDB database integration
- User authentication with JWT
- Service request management
- Role-based access control
- RESTful API endpoints

## Setup

1. Ensure you have the required environment variables in the `.env` file:
   ```
   MONGODB_URI=mongodb+srv://provolx:provolx99@cluster0.jry2x4n.mongodb.net/?appName=Cluster0
   MONGODB_DB_NAME=provolx
   JWT_SECRET=provolx_secret_key
   NODE_ENV=development
   PORT=3000
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the service:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Management
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Service Management
- `POST /api/services` - Create a new service request (customer)
- `GET /api/services` - Get all services for a customer (customer)
- `GET /api/services/provider` - Get all services for a provider (provider)
- `PUT /api/services/:id/status` - Update service status (provider)

## Database Schema

The backend uses the following collections:
- `users`: User information (customers, providers, admins)
- `services`: Service requests and appointments

## Role-Based Access

- **Customer**: Can create service requests, view their services
- **Provider**: Can view assigned services, update service status
- **Admin**: Full access to all features

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 3000)