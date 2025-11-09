import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Paperclip, Mic, Smile, Frown, Meh, ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import VoiceWaveAnimation from "./VoiceWaveAnimation";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  sentiment?: "positive" | "neutral" | "negative";
  reaction?: "up" | "down";
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hello! I'm your Provolx assistant. How can I help you today?",
      timestamp: new Date(),
      sentiment: "positive"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [suggestions] = useState([
    "Book service appointment",
    "Check warranty status",
    "Find nearest dealership",
    "Request roadside assistance"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Book Service",
    "Check Status", 
    "Find Dealer",
    "Emergency Help"
  ];

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIResponse = async (userMessage: string) => {
    try {
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Sorry, I encountered an error while processing your request. Please try again.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);
    setIsTyping(true);

    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: aiResponse,
        timestamp: new Date(),
        sentiment: "positive"
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
        sentiment: "negative"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReaction = (messageId: string, reaction: "up" | "down") => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, reaction } : msg
    ));
    toast.success(`Feedback recorded: ${reaction === "up" ? "👍" : "👎"}`);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Message copied to clipboard");
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast.success("Voice recording started");
    } else {
      toast.info("Voice recording stopped");
    }
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(inputValue.toLowerCase()) && inputValue.length > 0
  );

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-4 h-4 text-success" />;
      case "negative":
        return <Frown className="w-4 h-4 text-destructive" />;
      case "neutral":
        return <Meh className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl animate-pulse-glow z-50"
            variant="hero"
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] glass rounded-2xl shadow-2xl flex flex-col z-50"
          >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border gradient-vw rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="font-semibold text-primary-foreground">Provolx</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 group relative ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <p className="text-sm">{message.content}</p>
                      {message.sender === "ai" && getSentimentIcon(message.sentiment)}
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {/* Hover Actions */}
                    {message.sender === "ai" && (
                      <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background border rounded-lg p-1 shadow-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReaction(message.id, "up")}
                        >
                          <ThumbsUp className={`w-3 h-3 ${message.reaction === "up" ? "text-success fill-success" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReaction(message.id, "down")}
                        >
                          <ThumbsDown className={`w-3 h-3 ${message.reaction === "down" ? "text-destructive fill-destructive" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopy(message.content, message.id)}
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl p-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-foreground/40"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-foreground/40"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-foreground/40"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-border">
            <div className="flex gap-2 flex-wrap">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputValue(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            {/* Auto-suggestions */}
            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-2 space-y-1"
                >
                  {filteredSuggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        setInputValue(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-muted hover:bg-accent rounded-lg transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {isVoiceActive && (
              <div className="mb-2 flex items-center justify-center p-3 bg-secondary/10 rounded-lg">
                <VoiceWaveAnimation />
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={handleVoiceToggle}
              >
                <Mic className={`w-5 h-5 ${isVoiceActive ? "text-destructive animate-pulse" : ""}`} />
              </Button>
              <Button
                onClick={handleSend}
                size="icon"
                variant="default"
                className="shrink-0"
                disabled={!inputValue.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {inputValue.length}/500
            </p>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;