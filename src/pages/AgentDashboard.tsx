import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SentimentGauge from "@/components/SentimentGauge";
import { 
  MessageSquare, Clock, CheckCircle, Star, Search, Send,
  AlertCircle, TrendingUp, User, Car, Calendar, Mail, Phone,
  FileText, Smile, Meh, Frown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgentDashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);

  const metrics = [
    { label: "Active Conversations", value: "24", change: "+12%", icon: MessageSquare, color: "text-secondary" },
    { label: "Avg Response Time", value: "2.8s", change: "-15%", icon: Clock, color: "text-success" },
    { label: "Resolved Today", value: "47", change: "+8%", icon: CheckCircle, color: "text-success" },
    { label: "CSAT Score", value: "4.2/5", change: "stable", icon: Star, color: "text-warning" }
  ];

  const conversations = [
    {
      id: 1,
      customer: "Rajesh Kumar",
      vehicle: "VW Taigun 2023",
      priority: "urgent",
      sentiment: "negative",
      lastMessage: "My car is making strange noise",
      time: "2 mins ago",
      unread: 3
    },
    {
      id: 2,
      customer: "Priya Sharma",
      vehicle: "VW Virtus 2024",
      priority: "normal",
      sentiment: "positive",
      lastMessage: "Thank you for the quick response!",
      time: "15 mins ago",
      unread: 0
    },
    {
      id: 3,
      customer: "Amit Patel",
      vehicle: "VW Taigun 2022",
      priority: "normal",
      sentiment: "neutral",
      lastMessage: "When is my next service due?",
      time: "1 hour ago",
      unread: 1
    }
  ];

  const messages = [
    { sender: "customer", text: "My car is making strange noise from the engine", time: "10:30 AM" },
    { sender: "agent", text: "I understand your concern. Can you describe the noise in more detail?", time: "10:31 AM", suggested: false },
    { sender: "customer", text: "It's a clicking sound when I accelerate", time: "10:32 AM" },
    { sender: "ai-suggestion", text: "This could be related to the timing belt. I recommend scheduling an inspection.", confidence: 92 }
  ];

  const customerDetails = {
    name: "Rajesh Kumar",
    email: "rajesh.k@email.com",
    phone: "+91 98765 43210",
    vehicle: {
      model: "VW Taigun 2023",
      vin: "WVWZZZ1KZ9W123456",
      mileage: "12,500 km",
      warranty: "Active until Dec 2025"
    },
    serviceHistory: [
      { date: "Nov 2024", type: "Regular Service", status: "Completed" },
      { date: "Aug 2024", type: "Oil Change", status: "Completed" }
    ]
  };

  const sentimentData = [
    { time: "10:00", sentiment: 0 },
    { time: "10:15", sentiment: -20 },
    { time: "10:30", sentiment: -40 },
    { time: "10:45", sentiment: -30 },
    { time: "11:00", sentiment: 10 }
  ];

  const aiSuggestions = [
    { text: "Schedule diagnostic appointment for timing belt inspection", confidence: 92 },
    { text: "Offer complementary vehicle health check", confidence: 87 },
    { text: "Provide warranty coverage information", confidence: 85 }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <Smile className="w-4 h-4 text-success" />;
      case "negative": return <Frown className="w-4 h-4 text-destructive" />;
      default: return <Meh className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Agent Dashboard</h1>
          <p className="text-muted-foreground mt-2">Real-time customer support management</p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                      <span className={`text-sm font-semibold ${
                        metric.change.startsWith('+') ? 'text-success' : 
                        metric.change.startsWith('-') ? 'text-destructive' : 
                        'text-muted-foreground'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-3">
            <Card className="glass h-[calc(100vh-350px)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Active Chats
                </CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conv, i) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(i)}
                      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                        selectedConversation === i ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {conv.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold truncate">{conv.customer}</p>
                            {conv.priority === "urgent" && (
                              <AlertCircle className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conv.vehicle}</p>
                          <p className="text-sm truncate">{conv.lastMessage}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{conv.time}</span>
                            <div className="flex items-center gap-2">
                              {getSentimentIcon(conv.sentiment)}
                              {conv.unread > 0 && (
                                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                                  {conv.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-6">
            <Card className="glass h-[calc(100vh-350px)] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {conversations[selectedConversation].customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{conversations[selectedConversation].customer}</CardTitle>
                      <p className="text-sm text-muted-foreground">{conversations[selectedConversation].vehicle}</p>
                    </div>
                  </div>
                  {getSentimentIcon(conversations[selectedConversation].sentiment)}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i}>
                      {msg.sender === "ai-suggestion" ? (
                        <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-semibold text-secondary">AI Suggestion</p>
                            <span className="text-xs bg-secondary/20 px-2 py-1 rounded">
                              {msg.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-sm">{msg.text}</p>
                          <Button size="sm" variant="outline" className="mt-2">Use This Response</Button>
                        </div>
                      ) : (
                        <div className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[70%] rounded-2xl p-3 ${
                            msg.sender === "agent" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon" variant="default">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Customer 360 View */}
          <div className="lg:col-span-3">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Customer 360</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="profile">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="ai">AI Insights</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="font-semibold">{customerDetails.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{customerDetails.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{customerDetails.phone}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Car className="w-4 h-4 text-secondary" />
                        <p className="font-semibold">Vehicle Details</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model:</span>
                          <span>{customerDetails.vehicle.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VIN:</span>
                          <span className="font-mono text-xs">{customerDetails.vehicle.vin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mileage:</span>
                          <span>{customerDetails.vehicle.mileage}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Warranty:</span>
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                            {customerDetails.vehicle.warranty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-secondary" />
                        <p className="font-semibold">Service History</p>
                      </div>
                      <div className="space-y-2">
                        {customerDetails.serviceHistory.map((service, i) => (
                          <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                            <div>
                              <p className="font-semibold">{service.type}</p>
                              <p className="text-xs text-muted-foreground">{service.date}</p>
                            </div>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai" className="space-y-4">
                    <div>
                      <p className="font-semibold mb-3">Sentiment Trend</p>
                      <SentimentGauge sentiment={-30} size="lg" />
                      <div className="mt-4">
                        <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={sentimentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="sentiment" stroke="hsl(var(--secondary))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-3">AI Suggested Responses</p>
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, i) => (
                          <div key={i} className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                            <div className="flex items-start justify-between mb-2">
                              <TrendingUp className="w-4 h-4 text-secondary" />
                              <span className="text-xs bg-secondary/20 px-2 py-0.5 rounded">
                                {suggestion.confidence}%
                              </span>
                            </div>
                            <p className="text-sm">{suggestion.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="default" className="w-full" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Create Ticket
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Escalate
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Service
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
