import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, BarChart3, Users, Clock, Shield, Zap } from "lucide-react";
import AIServiceContainer from "@/components/AIServiceContainer";

const ProviderDemo = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time insights into service performance and customer satisfaction"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Centralized dashboard for all customer interactions and history"
    },
    {
      icon: Clock,
      title: "Efficiency Tools",
      description: "AI-assisted diagnostics and scheduling optimization"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Standardized processes and compliance monitoring"
    }
  ];

  const benefits = [
    {
      stat: "40%",
      description: "Reduction in service response time"
    },
    {
      stat: "60%",
      description: "Increase in customer retention"
    },
    {
      stat: "25%",
      description: "Cost savings through automation"
    },
    {
      stat: "90%",
      description: "First-time resolution rate"
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
            Service Provider Demo Experience
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Provolx empowers service centers with AI intelligence
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
                <h2 className="text-2xl font-bold mb-4">Service Center Transformation</h2>
                <p className="text-muted-foreground mb-4">
                  Provolx revolutionizes how service centers operate:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>AI-powered diagnostics and triage for incoming requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Automated appointment scheduling and resource allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Real-time performance monitoring and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Integrated CRM for enhanced customer relationships</span>
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
                <h2 className="text-2xl font-bold mb-4">Operational Benefits</h2>
                <p className="text-muted-foreground mb-4">
                  Maximize efficiency and customer satisfaction:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Reduce service bottlenecks with intelligent workload distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Improve first-time resolution rates with AI assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Enhance technician productivity with guided workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <span>Gain competitive advantage with data-driven insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Provider Features</h2>
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

        {/* Stats */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Proven Results</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-secondary mb-2">{benefit.stat}</div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              <h2 className="text-2xl font-bold mb-4">Transform Your Service Center</h2>
              <p className="text-muted-foreground mb-6">
                Join leading automotive service providers using Provolx AI Intelligence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    <Wrench className="w-5 h-5" />
                    Provider Login
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

export default ProviderDemo;