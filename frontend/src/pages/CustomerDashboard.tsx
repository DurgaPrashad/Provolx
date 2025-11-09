import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Calendar, MessageSquare, FileText, Settings, Bell, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AIServiceContainer from "@/components/AIServiceContainer";
import VoiceAssistant from "@/components/VoiceAssistant";
import { useState } from "react";

const CustomerDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  
  const vehicle = {
    model: "2023 VW Taigun",
    mileage: "12,500 km",
    lastService: "15 May 2024",
    nextServiceDue: "500 km"
  };

  const recentChats = [
    { id: 1, topic: "Service Booking Query", date: "2 hours ago", status: "Resolved" },
    { id: 2, topic: "Warranty Information", date: "1 day ago", status: "Resolved" },
    { id: 3, topic: "Technical Issue", date: "3 days ago", status: "In Progress" }
  ];

  const upcomingAppointment = {
    type: "Regular Service",
    date: "15 Dec 2024",
    time: "10:00 AM",
    dealer: "VW Service Center, Pune",
    daysLeft: 12
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Customer Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Manage your vehicle and services</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        <Card className="mb-8 border-secondary bg-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-secondary" />
                <div>
                  <p className="font-semibold text-lg">Your next service is due in {vehicle.nextServiceDue}</p>
                  <p className="text-muted-foreground">Book your appointment today to keep your vehicle in top condition</p>
                </div>
              </div>
              <Button variant="default">Book Now</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Service Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AIServiceContainer />
            </motion.div>

            {/* Voice Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <VoiceAssistant />
            </motion.div>

            {/* Vehicle Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-secondary" />
                    My Vehicle
                  </CardTitle>
                </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Car className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{vehicle.model}</h3>
                      <p className="text-muted-foreground">VIN: WVWZZZ1KZ9W123456</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage</p>
                        <p className="text-lg font-semibold">{vehicle.mileage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Service</p>
                        <p className="text-lg font-semibold">{vehicle.lastService}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Warranty Status</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-success/10 text-success">
                          Active
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Service Progress</p>
                        <Progress value={70} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Recent Conversations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentChats.map((chat) => (
                    <div 
                      key={chat.id}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold">{chat.topic}</p>
                          <p className="text-sm text-muted-foreground">{chat.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        chat.status === "Resolved" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {chat.status}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">View All Conversations</Button>
              </CardContent>
            </Card>
            </motion.div>

            {/* Service History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Service History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "15 May 2024", service: "Regular Service", cost: "₹4,500" },
                    { date: "20 Jan 2024", service: "Oil Change", cost: "₹2,800" },
                    { date: "10 Oct 2023", service: "Tire Rotation", cost: "₹1,500" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <div>
                          <p className="font-semibold">{item.service}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold">{item.cost}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointment */}
            <Card className="glass border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Upcoming Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-primary to-secondary rounded-xl text-white">
                  <div className="text-4xl font-bold mb-2">{upcomingAppointment.daysLeft}</div>
                  <div className="text-sm opacity-90">Days Left</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Service Type</p>
                    <p className="font-semibold">{upcomingAppointment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-semibold">{upcomingAppointment.date}, {upcomingAppointment.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{upcomingAppointment.dealer}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Reschedule</Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="default" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Start New Chat
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  View Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Car className="w-4 h-4" />
                  Find Dealer
                </Button>
              </CardContent>
            </Card>

            {/* Service Recommendations */}
            <Card className="glass bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-secondary">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-semibold text-sm mb-1">Tire Pressure Check</p>
                  <p className="text-xs text-muted-foreground">Due based on mileage</p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-semibold text-sm mb-1">Battery Health Check</p>
                  <p className="text-xs text-muted-foreground">Recommended yearly</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;