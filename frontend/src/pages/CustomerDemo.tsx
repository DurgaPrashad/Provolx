import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, MessageCircle, Calendar, FileText, Star } from "lucide-react";
import AIServiceContainer from "@/components/AIServiceContainer";

const CustomerDemo = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "Get instant help from our AI assistant for all your vehicle queries"
    },
    {
      icon: Calendar,
      title: "Service Booking",
      description: "Schedule appointments with authorized service centers in real-time"
    },
    {
      icon: FileText,
      title: "Service History",
      description: "Access complete maintenance records and warranty information"
    },
    {
      icon: Star,
      title: "Feedback System",
      description: "Rate your service experience and help us improve"
    }
  ];

  const handleTalkToAI = () => {
    // In a real implementation, this would open the chat widget or navigate to chat
    console.log("Talking to AI Service Provider");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Customer Demo Experience
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience how Provolx transforms your after-sales service with AI intelligence
          </p>
        </div>

        {/* AI Service Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <AIServiceContainer onTalkToAI={handleTalkToAI} />
        </motion.div>

        {/* Demo Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Journey</h2>
                <p className="text-muted-foreground mb-4">
                  As a vehicle owner, Provolx provides you with a seamless after-sales experience:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>24/7 AI-powered support for all your vehicle queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Real-time service booking with authorized centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Complete vehicle history and maintenance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Proactive maintenance reminders and alerts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                <p className="text-muted-foreground mb-4">
                  Our AI-powered platform delivers exceptional value:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>71% faster resolution times compared to traditional support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>80% reduction in service booking time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>95% customer satisfaction rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Proactive maintenance saving up to 30% on repair costs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Customer Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass h-full hover:scale-105 transition-transform">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="glass max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Experience Provolx?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of satisfied customers who have transformed their after-sales experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    <Car className="w-5 h-5" />
                    Customer Login
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline">
                    View Live Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDemo;