import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Database, Cloud, Shield, Zap } from "lucide-react";

const TechStack = () => {
  const categories = [
    {
      title: "AI & Machine Learning",
      icon: Brain,
      color: "text-secondary",
      technologies: [
        { name: "BERT", description: "Bidirectional Encoder Representations from Transformers for NLP" },
        { name: "GPT-4", description: "Advanced language model for conversation understanding" },
        { name: "Sentiment Analysis", description: "Real-time emotion detection and classification" },
        { name: "TensorFlow", description: "Machine learning framework for model training" }
      ]
    },
    {
      title: "Backend & APIs",
      icon: Code,
      color: "text-primary",
      technologies: [
        { name: "Python FastAPI", description: "High-performance API framework" },
        { name: "Node.js", description: "Event-driven JavaScript runtime" },
        { name: "Express.js", description: "Web application framework" },
        { name: "WebSocket", description: "Real-time bidirectional communication" }
      ]
    },
    {
      title: "Frontend",
      icon: Zap,
      color: "text-warning",
      technologies: [
        { name: "React.js", description: "Component-based UI library" },
        { name: "TypeScript", description: "Type-safe JavaScript superset" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Recharts", description: "Composable charting library" }
      ]
    },
    {
      title: "Database & Storage",
      icon: Database,
      color: "text-success",
      technologies: [
        { name: "PostgreSQL", description: "Relational database for structured data" },
        { name: "MongoDB", description: "NoSQL database for conversation logs" },
        { name: "Pinecone", description: "Vector database for semantic search" },
        { name: "Redis", description: "In-memory cache for session management" }
      ]
    },
    {
      title: "Cloud Infrastructure",
      icon: Cloud,
      color: "text-secondary",
      technologies: [
        { name: "AWS Lambda", description: "Serverless compute for scalable functions" },
        { name: "Azure AI Services", description: "Cloud-based AI capabilities" },
        { name: "Docker", description: "Containerization platform" },
        { name: "Kubernetes", description: "Container orchestration" }
      ]
    },
    {
      title: "Security & Monitoring",
      icon: Shield,
      color: "text-destructive",
      technologies: [
        { name: "OAuth 2.0", description: "Secure authentication protocol" },
        { name: "JWT", description: "JSON Web Tokens for authorization" },
        { name: "Prometheus", description: "Monitoring and alerting toolkit" },
        { name: "Grafana", description: "Analytics and visualization platform" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Technology Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on cutting-edge technologies for enterprise-grade performance, scalability, and reliability
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="glass mb-12 border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">System Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-secondary/5 rounded-lg">
                <Code className="w-12 h-12 mx-auto mb-3 text-secondary" />
                <h3 className="font-bold mb-2">Frontend Layer</h3>
                <p className="text-sm text-muted-foreground">
                  React + TypeScript for responsive, type-safe UI
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-lg">
                <Database className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">Backend Layer</h3>
                <p className="text-sm text-muted-foreground">
                  FastAPI + Node.js for scalable API services
                </p>
              </div>
              <div className="p-6 bg-success/5 rounded-lg">
                <Brain className="w-12 h-12 mx-auto mb-3 text-success" />
                <h3 className="font-bold mb-2">AI Layer</h3>
                <p className="text-sm text-muted-foreground">
                  GPT-4 + BERT for intelligent conversation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <Card key={i} className="glass hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.technologies.map((tech, j) => (
                      <div key={j} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <h4 className="font-semibold mb-1 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div>
                          {tech.name}
                        </h4>
                        <p className="text-sm text-muted-foreground pl-4">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Features */}
        <Card className="glass mt-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Why This Stack?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <Zap className="w-12 h-12 mx-auto mb-3 text-secondary" />
                <h3 className="font-bold mb-2">High Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Sub-3 second response times
                </p>
              </div>
              <div className="text-center p-6">
                <Cloud className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">Scalable</h3>
                <p className="text-sm text-muted-foreground">
                  Handles millions of users
                </p>
              </div>
              <div className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto mb-3 text-success" />
                <h3 className="font-bold mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security
                </p>
              </div>
              <div className="text-center p-6">
                <Brain className="w-12 h-12 mx-auto mb-3 text-warning" />
                <h3 className="font-bold mb-2">Intelligent</h3>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art AI models
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Info */}
        <Card className="glass mt-12 border-2 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Deployment & DevOps</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continuous Integration/Continuous Deployment (CI/CD) pipeline with automated testing, 
                Docker containerization, and Kubernetes orchestration for zero-downtime deployments
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <span className="px-4 py-2 bg-secondary/10 rounded-full text-sm font-semibold">
                  99.9% Uptime
                </span>
                <span className="px-4 py-2 bg-success/10 rounded-full text-sm font-semibold">
                  Auto-scaling
                </span>
                <span className="px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold">
                  Multi-region
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechStack;
