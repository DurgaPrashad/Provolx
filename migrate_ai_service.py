#!/usr/bin/env python3
"""
Migration script to help transition from the old Node.js AI service to the new Python/FastAPI AI service.
"""

import os
import shutil
import json

def backup_old_service():
    """Backup the old Node.js AI service"""
    if os.path.exists("ai-service"):
        print("Backing up old AI service...")
        shutil.copytree("ai-service", "ai-service-backup")
        print("Backup created as 'ai-service-backup'")
    else:
        print("No old AI service found to backup")

def update_package_json():
    """Update package.json to point to new AI service"""
    if os.path.exists("frontend/package.json"):
        with open("frontend/package.json", "r") as f:
            package_data = json.load(f)
        
        # Update the AI service URL if it exists in the config
        # This is a simple example - you might need to adjust based on your actual config
        if "aiServiceUrl" in package_data.get("config", {}):
            package_data["config"]["aiServiceUrl"] = "http://localhost:8001"
        
        with open("frontend/package.json", "w") as f:
            json.dump(package_data, f, indent=2)
        
        print("Updated frontend package.json to point to new AI service")

def update_env_files():
    """Update environment files to use new AI service port"""
    # Update backend .env file
    if os.path.exists("backend/.env"):
        with open("backend/.env", "r") as f:
            env_content = f.read()
        
        # Replace AI service URL
        env_content = env_content.replace("AI_SERVICE_URL=http://localhost:3001", 
                                         "AI_SERVICE_URL=http://localhost:8001")
        
        with open("backend/.env", "w") as f:
            f.write(env_content)
        
        print("Updated backend .env file")
    
    # Update frontend .env file
    if os.path.exists("frontend/.env"):
        with open("frontend/.env", "r") as f:
            env_content = f.read()
        
        # Replace AI service URL
        env_content = env_content.replace("VITE_AI_SERVICE_URL=http://localhost:3001", 
                                         "VITE_AI_SERVICE_URL=http://localhost:8001")
        
        with open("frontend/.env", "w") as f:
            f.write(env_content)
        
        print("Updated frontend .env file")

def print_migration_instructions():
    """Print instructions for completing the migration"""
    instructions = """
Migration to Python AI Service Complete!

Next steps:
1. Start the new Python AI service:
   cd ai-service-python
   python main.py

2. Verify the service is running:
   curl http://localhost:8001/health

3. Start your backend and frontend services as usual:
   cd backend && npm run dev
   cd frontend && npm run dev

4. Test the AI functionality through the frontend interface

The new Python AI service includes:
- Enhanced data type detection for automotive data
- Graph and chart visualization capabilities
- Better error handling and logging
- Improved performance with FastAPI
"""
    print(instructions)

if __name__ == "__main__":
    print("Starting migration from Node.js AI service to Python/FastAPI AI service...")
    
    backup_old_service()
    update_package_json()
    update_env_files()
    print_migration_instructions()
    
    print("Migration script completed!")