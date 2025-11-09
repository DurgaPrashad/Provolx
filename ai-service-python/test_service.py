import requests
import json

# Test the health endpoint
def test_health():
    response = requests.get("http://localhost:8001/health")
    print("Health Check:")
    print(response.json())
    print()

# Test the chat endpoint
def test_chat():
    # Sample data for testing
    sample_data = {
        "message": "Show me a chart of this data",
        "token": "test_token",
        "sheetData": {
            "name": "Vehicle Service Records",
            "columns": [
                {"name": "VehicleID"},
                {"name": "Mileage"},
                {"name": "ServiceType"},
                {"name": "Cost"}
            ],
            "dataPreview": [
                ["V1001", 15000, "Oil Change", 50],
                ["V1002", 30000, "Tire Rotation", 75],
                ["V1003", 45000, "Brake Service", 200],
                ["V1004", 15000, "Oil Change", 50],
                ["V1005", 60000, "Engine Tuneup", 300]
            ],
            "rowCount": 5
        },
        "conversation_history": []
    }
    
    response = requests.post(
        "http://localhost:8001/chat",
        headers={"Content-Type": "application/json"},
        data=json.dumps(sample_data)
    )
    
    print("Chat Response:")
    print(response.json())
    print()

if __name__ == "__main__":
    print("Testing Provolx AI Service")
    print("=" * 30)
    
    try:
        test_health()
        test_chat()
    except Exception as e:
        print(f"Error testing service: {e}")
        print("Make sure the AI service is running on port 8001")