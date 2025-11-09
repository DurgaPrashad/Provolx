import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createChatSession, addMessageToChat } from "@/services/chatService";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map(result => result.transcript)
            .join('');
          setTranscript(transcript);
          
          // Check for wake words
          if (!isListening && (transcript.toLowerCase().includes('hey volks') || transcript.toLowerCase().includes('hey voks'))) {
            startListening();
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
        };
        
        recognitionRef.current.onend = () => {
          if (isListening && !isPaused) {
            // Auto-stop after user finishes speaking
            stopListening();
          }
        };
      }
    }
    
    // Create a chat session when component mounts
    const initializeChatSession = async () => {
      try {
        // In a real app, you would get the actual user ID
        const userId = "demo-user-id";
        const session = await createChatSession(userId);
        setSessionId(session.sessionId);
      } catch (error) {
        console.error('Failed to create chat session:', error);
      }
    };
    
    initializeChatSession();
    
    // Start listening for wake words
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    setTranscript("");
    setResponse("");
    recognitionRef.current?.start();
    setIsListening(true);
  };

  const stopListening = async () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    
    // Save the transcript to chat history
    if (transcript && sessionId) {
      const newMessage = { role: 'user', content: transcript };
      setChatHistory(prev => [...prev, newMessage]);
      
      try {
        // Store user message in MongoDB and get AI response
        const updatedChat = await addMessageToChat(sessionId, 'user', transcript);
        
        // Get the AI response (it's the last message in the updated chat)
        const aiMessage = updatedChat.messages[updatedChat.messages.length - 1];
        if (aiMessage.role === 'assistant') {
          setResponse(aiMessage.content);
          setChatHistory(updatedChat.messages);
          
          // Play the response using text-to-speech
          playResponse(aiMessage.content);
        }
      } catch (error) {
        console.error('Failed to save user message:', error);
        setResponse("Sorry, I encountered an error processing your request.");
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const playResponse = async (text: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/chat/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.error('Failed to play response:', error);
    }
  };

  return (
    <div className="w-full">
      <Card className="glass border-2 border-secondary/20 rounded-lg">
        <CardContent className="p-4">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-3">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" /> 
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" /> 
                    Start Voice Chat
                  </>
                )}
              </Button>
              
              {isListening && (
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={togglePause}
                  variant={isPaused ? "default" : "secondary"}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-5 h-5" /> 
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5" /> 
                      Pause
                    </>
                  )}
                </Button>
              )}
            </div>
            
            {(transcript || response) && (
              <div className="w-full mt-3 space-y-2 text-left">
                {transcript && (
                  <div className="p-2 bg-primary/10 rounded">
                    <p className="text-xs font-semibold">You:</p>
                    <p className="text-sm">{transcript}</p>
                  </div>
                )}
                {response && (
                  <div className="p-2 bg-secondary/10 rounded">
                    <p className="text-xs font-semibold">AI Assistant:</p>
                    <p className="text-sm">{response}</p>
                  </div>
                )}
              </div>
            )}
            
            {chatHistory.length > 0 && (
              <div className="w-full mt-3 max-h-32 overflow-y-auto">
                <h3 className="text-xs font-semibold mb-1">Chat History:</h3>
                {chatHistory.slice(-3).map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-1 rounded text-xs mb-1 ${
                      msg.role === 'user' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary/10 text-secondary'
                    }`}
                  >
                    <span className="font-semibold">{msg.role === 'user' ? 'You' : 'AI'}:</span> {msg.content}
                  </div>
                ))}
              </div>
            )}
            
            {/* Hidden audio element for playing responses */}
            <audio ref={audioRef} className="hidden" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;