from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai
from typing import List, Optional, Dict, Any
import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from datetime import datetime

load_dotenv()

app = FastAPI(title="Provolx AI Assistant - Gemini Powered")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5000",
        "https://finxan.your-subdomain.pages.dev",  # Cloudflare Pages deployment
        "https://finxan.pages.dev"  # Custom domain if configured
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini AI
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# System prompt for automotive data analysis
SYSTEM_PROMPT = """You are an intelligent automotive data analysis assistant for Provolx.
You help Volkswagen customers and service providers analyze vehicle data, service records, and performance metrics.

When answering:
- Be concise and direct
- Use emojis to make responses friendly
- Provide actionable insights
- Format numbers clearly (use commas for thousands)
- When suggesting actions, be specific
- Always analyze the data provided in the context
- If user asks about specific data points, search through the column names and values provided
- For numerical columns, calculate averages, totals, trends, etc.
- For categorical columns, identify patterns, distributions, unique values, etc.
- Always provide concrete examples from the actual data when possible
- When appropriate, suggest creating visualizations to better understand the data

Your tone should be professional yet friendly, like a helpful automotive expert."""

class Message(BaseModel):
    role: str
    content: str

class SheetData(BaseModel):
    name: Optional[str] = None
    columns: Optional[List[Dict[str, Any]]] = None
    dataPreview: Optional[List[Any]]] = None
    rowCount: Optional[int] = None

class ChatRequest(BaseModel):
    message: str
    token: str
    sheetData: Optional[SheetData] = None
    conversation_history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    answer: str
    model: str
    timestamp: str
    visualization: Optional[str] = None  # Base64 encoded image

class GeminiAIEngine:
    def __init__(self):
        self.system_prompt = SYSTEM_PROMPT
        
    def detect_data_type(self, columns, data_preview):
        """Detect the type of data in the sheet based on column names and sample data"""
        if not columns:
            return "General Data"
        
        column_names = [col.get('name', '').lower() for col in columns]
        column_names_str = ' '.join(column_names).lower()
        
        # Sample data values for additional context
        sample_text = ''
        if data_preview and len(data_preview) > 0:
            sample_text = str(data_preview[0]).lower()
        
        combined_context = (column_names_str + ' ' + sample_text).lower()
        
        # Automotive/Vehicle specific data types
        if any(keyword in combined_context for keyword in [
            'vehicle', 'car', 'model', 'make', 'year', 'mileage', 'vin', 
            'engine', 'transmission', 'fuel', 'maintenance', 'service'
        ]):
            return "Automotive/Vehicle"
        
        # Service Records
        if any(keyword in combined_context for keyword in [
            'service', 'appointment', 'booking', 'technician', 'repair', 
            'diagnosis', 'labor', 'parts', 'cost', 'invoice'
        ]):
            return "Service Records"
        
        # Customer Data
        if any(keyword in combined_context for keyword in [
            'customer', 'client', 'name', 'phone', 'email', 'address', 
            'loyalty', 'feedback', 'satisfaction', 'complaint'
        ]):
            return "Customer Data"
        
        # Sales Data
        if any(keyword in combined_context for keyword in [
            'sale', 'purchase', 'price', 'dealer', 'salesperson', 
            'transaction', 'payment', 'financing'
        ]):
            return "Sales Data"
        
        # Inventory Data
        if any(keyword in combined_context for keyword in [
            'inventory', 'stock', 'parts', 'sku', 'quantity', 
            'supplier', 'warehouse', 'location'
        ]):
            return "Inventory Data"
        
        return "General Data"
    
    def get_context_aware_prompt(self, data_type, columns, name):
        """Generate context-aware prompt based on detected data type"""
        column_names = [col.get('name', '') for col in columns] if columns else []
        
        if data_type == "Automotive/Vehicle":
            return f"""You are an intelligent automotive data assistant for Provolx.
You're analyzing {name or 'vehicle data'} which contains AUTOMOTIVE/VEHICLE DATA.

Adapt your responses to automotive context:
- Use automotive terminology (mileage, service intervals, maintenance schedules)
- Focus on vehicle performance, maintenance needs, reliability metrics
- Calculate average mileage, service frequency, common issues
- Identify vehicles needing service, maintenance patterns, warranty status
- Analyze vehicle performance trends and service history
- Use a professional, automotive-focused tone

Example questions you should handle naturally:
- "Show me vehicles due for service"
- "Calculate average mileage by model"
- "Identify common maintenance issues"
- "Show warranty expiration dates"
- "List vehicles with high mileage"
- "What's the service frequency?"

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""
        
        elif data_type == "Service Records":
            return f"""You are an intelligent service records assistant for Provolx.
You're analyzing {name or 'service records'} which contains SERVICE RECORDS DATA.

Adapt your responses to service context:
- Use service terminology (appointments, repairs, diagnostics, labor)
- Focus on service performance, technician efficiency, customer satisfaction
- Calculate average service time, repair costs, completion rates
- Identify common repairs, technician performance, parts usage
- Analyze service trends, seasonal patterns, customer feedback
- Use a professional, service-focused tone

Example questions you should handle naturally:
- "Show me service summary"
- "Calculate average repair time"
- "What are the common repairs?"
- "Show technician performance"
- "List high-cost services"
- "What's the customer satisfaction rate?"

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""
        
        elif data_type == "Customer Data":
            return f"""You are an intelligent customer data assistant for Provolx.
You're analyzing {name or 'customer data'} which contains CUSTOMER DATA.

Adapt your responses to customer context:
- Use customer terminology (loyalty, satisfaction, feedback, complaints)
- Focus on customer behavior, satisfaction levels, retention rates
- Calculate customer lifetime value, satisfaction scores, feedback trends
- Identify loyal customers, at-risk customers, feedback patterns
- Analyze customer demographics, preferences, service history
- Use a friendly, customer-focused tone

Example questions you should handle naturally:
- "Show me customer satisfaction scores"
- "Calculate customer retention rate"
- "Identify loyal customers"
- "Show feedback trends"
- "List at-risk customers"
- "What are common complaints?"

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""
        
        elif data_type == "Sales Data":
            return f"""You are an intelligent sales data assistant for Provolx.
You're analyzing {name or 'sales data'} which contains SALES DATA.

Adapt your responses to sales context:
- Use sales terminology (transactions, pricing, dealers, commissions)
- Focus on sales performance, revenue trends, customer preferences
- Calculate total sales, average transaction value, conversion rates
- Identify top-selling models, dealer performance, seasonal trends
- Analyze pricing strategies, customer demographics, financing options
- Use a professional, sales-focused tone

Example questions you should handle naturally:
- "Show me sales summary"
- "Calculate total revenue"
- "What are the trends?"
- "Show top dealers"
- "List high-value transactions"
- "What's the average sale price?"

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""
        
        elif data_type == "Inventory Data":
            return f"""You are an intelligent inventory management assistant for Provolx.
You're analyzing {name or 'inventory data'} which contains INVENTORY DATA.

Adapt your responses to inventory context:
- Use inventory terminology (parts, stock levels, suppliers, SKUs)
- Focus on stock availability, supply chain management, inventory value
- Calculate total inventory value, stock turnover, reorder needs
- Identify low stock items, overstock situations, fast-moving parts
- Analyze supplier performance, seasonal demand patterns
- Use a professional, inventory-focused tone

Example questions you should handle naturally:
- "Show me inventory status"
- "Calculate total inventory value"
- "What needs reordering?"
- "Show fast-moving parts"
- "List overstock items"
- "What's the stock turnover rate?"

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""
        
        else:
            return f"""You are an intelligent data analysis assistant for Provolx.
You're analyzing {name or 'data'} which contains GENERAL DATA.

Adapt your responses to general data analysis:
- Focus on patterns, trends, and insights in the data
- Calculate relevant statistics, identify outliers, find correlations
- Provide clear, actionable recommendations
- Use appropriate terminology for the data context
- Always base your responses on the actual data provided

Available columns: {', '.join(column_names) if column_names else 'None provided'}
Always use specific data from these columns to answer questions."""

    async def chat(self, message: str, token: str, conversation_history: List[Dict] = None, sheet_data: SheetData = None):
        """Process chat with Gemini AI and generate response with optional visualization"""
        try:
            # Prepare context based on sheet data
            context_prompt = self.system_prompt
            
            if sheet_data and sheet_data.columns:
                data_type = self.detect_data_type(sheet_data.columns, sheet_data.dataPreview)
                context_prompt = self.get_context_aware_prompt(
                    data_type, sheet_data.columns, sheet_data.name
                )
            
            # Prepare conversation history
            history_text = ""
            if conversation_history:
                history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation_history])
            
            # Prepare sheet data context
            sheet_context = ""
            if sheet_data and sheet_data.dataPreview:
                sheet_context = f"""
Sheet Data Context:
- Sheet Name: {sheet_data.name or 'Unnamed Sheet'}
- Row Count: {sheet_data.rowCount or 'Unknown'}
- Columns: {', '.join([col.get('name', 'Unnamed') for col in sheet_data.columns]) if sheet_data.columns else 'None provided'}
- Data Preview: {str(sheet_data.dataPreview[:3]) if sheet_data.dataPreview else 'No data provided'}
"""
            
            # Create full prompt
            full_prompt = f"""
{context_prompt}

Conversation History:
{history_text}

{sheet_context}

User Question: {message}

Please provide a helpful response. If the question involves data analysis that would benefit from visualization, 
please suggest creating a chart or graph and describe what type of visualization would be most appropriate.
"""
            
            # Generate response using Gemini
            response = model.generate_content(full_prompt)
            
            # Check if we should generate a visualization
            visualization = None
            if sheet_data and sheet_data.dataPreview and "chart" in message.lower() or "graph" in message.lower() or "visualize" in message.lower():
                visualization = self.generate_visualization(sheet_data)
            
            return {
                "answer": response.text,
                "model": "gemini-2.0-flash-exp",
                "visualization": visualization
            }
            
        except Exception as e:
            print(f"Error in Gemini AI chat: {str(e)}")
            raise Exception(f"AI processing error: {str(e)}")
    
    def generate_visualization(self, sheet_data: SheetData) -> Optional[str]:
        """Generate a visualization based on sheet data"""
        try:
            if not sheet_data or not sheet_data.dataPreview:
                return None
            
            # Convert data to DataFrame for easier manipulation
            if sheet_data.columns and sheet_data.dataPreview:
                # Create DataFrame from columns and data
                column_names = [col.get('name', f'Column_{i}') for i, col in enumerate(sheet_data.columns)]
                df = pd.DataFrame(sheet_data.dataPreview, columns=column_names)
                
                # Try to create a simple visualization
                plt.figure(figsize=(10, 6))
                
                # If we have numerical data, create a histogram or bar chart
                numerical_columns = df.select_dtypes(include=['number']).columns
                if len(numerical_columns) > 0:
                    # Create histogram for the first numerical column
                    plt.hist(df[numerical_columns[0]].dropna(), bins=20, alpha=0.7)
                    plt.title(f'Distribution of {numerical_columns[0]}')
                    plt.xlabel(numerical_columns[0])
                    plt.ylabel('Frequency')
                else:
                    # Create bar chart for categorical data
                    categorical_columns = df.select_dtypes(include=['object']).columns
                    if len(categorical_columns) > 0:
                        value_counts = df[categorical_columns[0]].value_counts().head(10)
                        plt.bar(range(len(value_counts)), value_counts.values)
                        plt.title(f'Top 10 {categorical_columns[0]} Values')
                        plt.xlabel(categorical_columns[0])
                        plt.ylabel('Count')
                        plt.xticks(range(len(value_counts)), value_counts.index, rotation=45)
                
                plt.tight_layout()
                
                # Save plot to base64 string
                buf = io.BytesIO()
                plt.savefig(buf, format='png')
                buf.seek(0)
                img_base64 = base64.b64encode(buf.read()).decode('utf-8')
                plt.close()
                
                return img_base64
            
            return None
        except Exception as e:
            print(f"Error generating visualization: {str(e)}")
            return None

# Initialize Gemini AI Engine
ai_engine = GeminiAIEngine()

@app.get("/")
def root():
    return {
        "message": "Provolx AI Assistant API - Powered by Gemini 2.0 Flash",
        "status": "active",
        "version": "2.0.0",
        "model": "gemini-2.0-flash-exp"
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    AI Chat endpoint with Gemini 2.0 Flash
    """
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if not request.token:
            raise HTTPException(status_code=401, detail="Authentication token required")
        
        # Log incoming request
        print(f"📨 Received AI request:")
        print(f"   - Message: {request.message[:50]}...")
        print(f"   - Has sheetData: {request.sheetData is not None}")
        if request.sheetData:
            print(f"   - Sheet name: {request.sheetData.name or 'Unknown'}")
            print(f"   - Sheet rows: {request.sheetData.rowCount or 0}")
            print(f"   - DataPreview length: {len(request.sheetData.dataPreview) if request.sheetData.dataPreview else 0}")
        
        # Process with Gemini AI
        result = await ai_engine.chat(
            request.message, 
            request.token,
            conversation_history=[msg.dict() for msg in request.conversation_history] if request.conversation_history else [],
            sheet_data=request.sheetData
        )
        
        print(f"✅ Generated response: {result.get('answer', 'No answer')[:100]}...")
        
        return ChatResponse(
            answer=result['answer'],
            model=result.get('model', 'gemini-2.0-flash-exp'),
            timestamp=datetime.now().isoformat(),
            visualization=result.get('visualization')
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "gemini-2.0-flash-exp"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)