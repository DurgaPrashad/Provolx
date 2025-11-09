import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, Globe, ArrowRight, CheckCircle, TrendingUp, Clock, MessageSquare, Bot, Headphones, ClockIcon, FileText, Car, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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

  const customerBenefits = [
    {
      icon: Headphones,
      title: "24/7 Availability",
      description: "Get instant help anytime, anywhere without waiting for business hours"
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "No more waiting on hold - get immediate answers to your questions"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Communicate in your preferred language with our AI assistant"
    },
    {
      icon: ClockIcon,
      title: "Time Saving",
      description: "Resolve issues quickly without lengthy phone calls or visits"
    }
  ];

  const supportBenefits = [
    {
      icon: FileText,
      title: "Automated Documentation",
      description: "AI automatically logs and categorizes customer interactions for future reference"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Real-time insights into customer satisfaction and support metrics"
    },
    {
      icon: Car,
      title: "Predictive Maintenance",
      description: "Proactive service recommendations based on vehicle data and usage patterns"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Consistent, accurate responses that follow brand guidelines and protocols"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 30, 80, 0.7), rgba(0, 176, 240, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-vw-blue/70 via-vw-blue/40 to-vw-light-blue/30" />
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

      {/* AI Agent Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Meet Your AI Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligent AI agent is ready to help you. You can talk to it and book services anytime.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
            {/* Left Glass Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/3 glass rounded-2xl p-6 border border-secondary/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Benefits for Customers</h3>
              <div className="space-y-4">
                {customerBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-lg bg-secondary/10">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Center Animation - Made Bigger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="loader" style={{ transform: "scale(1.5)" }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <defs>
                    <mask id="clipping">
                      <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                      <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                      <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                      <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                    </mask>
                  </defs>
                </svg>
                <div className="box"></div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              >
                <Link to="/demo">
                  <Button size="lg" variant="default" className="text-lg px-8 py-6 gap-2">
                    <Bot className="w-5 h-5" /> Talk to AI Agent
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Glass Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/3 glass rounded-2xl p-6 border border-secondary/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Benefits for After-Sales Support</h3>
              <div className="space-y-4">
                {supportBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-lg bg-secondary/10">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8 border border-secondary/20 max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-6 text-center text-primary">How AI Intelligence Transforms After-Sales Support</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-secondary">For Customers</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Personalized Assistance:</strong> AI understands your specific vehicle model and service history for tailored recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Proactive Support:</strong> Receive maintenance reminders and service alerts before issues arise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Seamless Experience:</strong> Access support through your preferred channel - chat, voice, or mobile app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Real-time Updates:</strong> Track service progress and get instant notifications about your vehicle status</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 text-secondary">For After-Sales Support Teams</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Enhanced Efficiency:</strong> Automate routine inquiries, freeing agents to handle complex issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Data-Driven Insights:</strong> Leverage analytics to identify trends and improve service quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Consistent Service:</strong> Ensure all customers receive uniform, high-quality support regardless of agent availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span><strong>Scalable Solutions:</strong> Handle increased customer volume without proportional staffing increases</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg">
                With AI Intelligence, we're not just improving support - we're redefining the entire after-sales experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Login Demo Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Experience Provolx
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Provolx transforms the after-sales experience for both customers and service providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass h-full border-2 border-secondary/20 hover:border-secondary transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Customer Experience</h3>
                  <p className="text-muted-foreground mb-6">
                    Experience seamless after-sales support with our AI-powered platform designed for vehicle owners.
                  </p>
                  <Link to="/customer-demo">
                    <Button size="lg" variant="default" className="w-full">
                      View Customer Demo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass h-full border-2 border-secondary/20 hover:border-secondary transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Wrench className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Service Provider Experience</h3>
                  <p className="text-muted-foreground mb-6">
                    Empower your service center with AI intelligence for enhanced efficiency and customer satisfaction.
                  </p>
                  <Link to="/provider-demo">
                    <Button size="lg" variant="default" className="w-full">
                      View Provider Demo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/login">
              <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
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