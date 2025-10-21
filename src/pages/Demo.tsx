import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Smile, Meh, Frown, CheckCircle } from "lucide-react";
import SentimentGauge from "@/components/SentimentGauge";
import Confetti from "react-confetti";

interface Message {
  id: number;
  sender: "customer" | "ai" | "agent";
  text: string;
  sentiment?: number;
  delay: number;
}

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const script: Message[] = [
    { id: 1, sender: "customer", text: "Hi, my car is making a strange noise", sentiment: 0, delay: 1000 },
    { id: 2, sender: "ai", text: "Hello! I'm here to help. Can you describe the noise in more detail?", sentiment: 50, delay: 1500 },
    { id: 3, sender: "customer", text: "It's a clicking sound when I accelerate. This is very concerning!", sentiment: -30, delay: 2000 },
    { id: 4, sender: "ai", text: "I understand your concern. This could be related to the timing belt or engine components.", sentiment: 20, delay: 1500 },
    { id: 5, sender: "customer", text: "I need this fixed ASAP! I have important meetings!", sentiment: -60, delay: 1800 },
    { id: 6, sender: "agent", text: "I see this requires urgent attention. I'm John, a senior technician. Let me help you right away.", sentiment: 30, delay: 2000 },
    { id: 7, sender: "agent", text: "I've checked your vehicle history. Your timing belt is due for inspection. I can book an emergency appointment today at 3 PM.", sentiment: 50, delay: 2500 },
    { id: 8, sender: "customer", text: "That would be perfect! Thank you so much!", sentiment: 80, delay: 1500 },
    { id: 9, sender: "agent", text: "Appointment confirmed! You'll receive a confirmation email shortly. We'll have you back on the road safely.", sentiment: 90, delay: 2000 },
  ];

  useEffect(() => {
    if (!isPlaying || currentStep >= script.length) return;

    const timer = setTimeout(() => {
      const message = script[currentStep];
      setMessages(prev => [...prev, message]);
      setCurrentStep(prev => prev + 1);

      if (currentStep === script.length - 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, script[currentStep].delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setMessages([]);
    setShowConfetti(false);
  };

  const getCurrentSentiment = () => {
    if (messages.length === 0) return 0;
    return messages[messages.length - 1].sentiment || 0;
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 30) return <Smile className="w-4 h-4 text-success" />;
    if (sentiment < -30) return <Frown className="w-4 h-4 text-destructive" />;
    return <Meh className="w-4 h-4 text-warning" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Live Demo: AI-Powered Support Flow
          </motion.h1>
          <p className="text-muted-foreground">
            Watch how VW SmartSupport handles a real customer interaction
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={handlePlayPause} size="lg" variant="default" className="gap-2">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? "Pause" : "Play Demo"}
          </Button>
          <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="glass h-[600px] flex flex-col">
              <div className="p-4 border-b bg-gradient-to-r from-primary to-secondary">
                <h2 className="text-lg font-bold text-white">Customer Conversation</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.sender === "customer" ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[80%] space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${
                            message.sender === "customer" ? "text-primary" :
                            message.sender === "ai" ? "text-secondary" :
                            "text-success"
                          }`}>
                            {message.sender === "customer" ? "Customer" :
                             message.sender === "ai" ? "AI Assistant" :
                             "Human Agent (John)"}
                          </span>
                          {message.sentiment !== undefined && getSentimentIcon(message.sentiment)}
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          message.sender === "customer"
                            ? "bg-primary text-primary-foreground"
                            : message.sender === "ai"
                            ? "bg-secondary/10 border border-secondary/20"
                            : "bg-success/10 border border-success/20"
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isPlaying && currentStep < script.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* Real-time Sentiment */}
            <Card className="glass">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">Real-time Sentiment</h3>
                <SentimentGauge sentiment={getCurrentSentiment()} size="md" />
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Messages</span>
                    <span className="font-semibold">{messages.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Handled</span>
                    <span className="font-semibold">
                      {messages.filter(m => m.sender === "ai").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Agent Assist</span>
                    <span className="font-semibold">
                      {messages.filter(m => m.sender === "agent").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="glass">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold text-lg mb-4">Process Flow</h3>
                
                {[
                  { step: "Customer Contact", active: currentStep >= 1 },
                  { step: "AI Analysis", active: currentStep >= 2 },
                  { step: "Sentiment Detection", active: currentStep >= 3 },
                  { step: "Negative Sentiment Alert", active: currentStep >= 5 },
                  { step: "Escalate to Agent", active: currentStep >= 6 },
                  { step: "Appointment Booked", active: currentStep >= 8 },
                  { step: "Resolution Complete", active: currentStep >= 9 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: item.active ? 1 : 0.3 }}
                    className="flex items-center gap-3"
                  >
                    {item.active ? (
                      <CheckCircle className="w-5 h-5 text-success shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
                    )}
                    <span className={`text-sm ${item.active ? "font-semibold" : "text-muted-foreground"}`}>
                      {item.step}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Key Metrics */}
            {currentStep >= 9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="glass border-2 border-success">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-success flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Demo Complete!
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Resolution Time:</span>
                        <span className="font-semibold">2m 45s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Final Sentiment:</span>
                        <span className="font-semibold text-success">+90 (Very Positive)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Outcome:</span>
                        <span className="font-semibold">Appointment Booked</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
