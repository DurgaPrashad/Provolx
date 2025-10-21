import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, Globe, ArrowRight, CheckCircle, TrendingUp, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time AI Responses",
      description: "Get instant answers in under 3 seconds with advanced natural language processing"
    },
    {
      icon: MessageSquare,
      title: "Sentiment-Aware Conversations",
      description: "AI that understands emotions and adapts responses for better customer experience"
    },
    {
      icon: Globe,
      title: "35+ Languages Support",
      description: "Break language barriers with multilingual AI support available 24/7"
    },
    {
      icon: Shield,
      title: "Seamless CRM Integration",
      description: "Connect with existing systems for unified customer data management"
    }
  ];

  const stats = [
    { value: "71%", label: "Queries Auto-Resolved", icon: CheckCircle },
    { value: "30%", label: "Cost Reduction", icon: TrendingUp },
    { value: "80%", label: "Faster Response Time", icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 30, 80, 0.95), rgba(0, 176, 240, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-vw-blue/90 via-vw-blue/70 to-vw-light-blue/60" />
        <ParticlesBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
            >
              Transform After-Sales Support with{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-secondary"
              >
                AI Intelligence
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            >
              Revolutionize your customer service with sentiment-aware AI that understands, responds, and resolves in real-time
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link to="/demo">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6 gap-2">
                  Live Demo <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="glass" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/20">
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-secondary/20 blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Powerful Features for Modern Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to deliver exceptional customer service at scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className="glass border-2 hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl h-full"
                  >
                    <CardContent className="p-6 space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center"
                      >
                        <Icon className="w-7 h-7 text-secondary" />
                      </motion.div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 gradient-vw">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="text-center space-y-4 p-8 glass rounded-2xl border-white/20 hover:scale-105 transition-transform"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-12 h-12 text-white mx-auto" />
                  </motion.div>
                  <div className="text-6xl font-bold text-white">{stat.value}</div>
                  <div className="text-xl text-white/90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card className="glass border-2 border-secondary/20 overflow-hidden">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Ready to Transform Your Support?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join leading automotive companies using VW SmartSupport to deliver exceptional customer experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link to="/customer-dashboard">
                  <Button size="lg" variant="default" className="text-lg px-8 py-6">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/tech-stack">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
