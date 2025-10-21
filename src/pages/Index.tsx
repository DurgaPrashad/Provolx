import { Link } from "react-router-dom";
import { Zap, Shield, Globe, ArrowRight, CheckCircle, TrendingUp, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform After-Sales Support with{" "}
              <span className="text-secondary animate-pulse-slow">AI Intelligence</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Revolutionize your customer service with sentiment-aware AI that understands, responds, and resolves in real-time
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/customer-dashboard">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6 gap-2">
                  Live Demo <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="glass" className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/20">
                  View Dashboard
                </Button>
              </Link>
            </div>
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
                <Card 
                  key={index} 
                  className="glass border-2 hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
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
                <div 
                  key={index}
                  className="text-center space-y-4 p-8 glass rounded-2xl border-white/20 hover:scale-105 transition-transform"
                >
                  <Icon className="w-12 h-12 text-white mx-auto" />
                  <div className="text-6xl font-bold text-white">{stat.value}</div>
                  <div className="text-xl text-white/90">{stat.label}</div>
                </div>
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
