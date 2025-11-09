import { Card, CardContent } from "@/components/ui/card";
import { 
  User, Shield, Brain, Gauge, ArrowRight, 
  GitBranch, Cog, CheckCircle, Mail 
} from "lucide-react";

const ProcessFlow = () => {
  const steps = [
    {
      title: "Customer Contact",
      icon: User,
      description: "Customer initiates conversation via chat, email, or phone",
      color: "bg-secondary",
      details: [
        "Multi-channel support (Web, Mobile, WhatsApp)",
        "24/7 availability",
        "Instant connection"
      ]
    },
    {
      title: "Authentication & Verification",
      icon: Shield,
      description: "System verifies customer identity and retrieves account information",
      color: "bg-primary",
      details: [
        "Secure authentication",
        "Vehicle data retrieval",
        "Service history access"
      ]
    },
    {
      title: "AI Analysis",
      icon: Brain,
      description: "Natural language processing analyzes the query",
      color: "bg-secondary",
      details: [
        "Intent classification",
        "Context understanding",
        "Knowledge base search"
      ]
    },
    {
      title: "Sentiment Detection",
      icon: Gauge,
      description: "AI evaluates customer emotion and urgency level",
      color: "bg-warning",
      details: [
        "Real-time emotion analysis",
        "Urgency scoring",
        "Priority assignment"
      ]
    },
    {
      title: "Decision Point",
      icon: GitBranch,
      description: "System decides between AI response or human escalation",
      color: "bg-primary",
      details: [
        "Confidence threshold check",
        "Complexity assessment",
        "Routing logic"
      ]
    },
    {
      title: "Response & Action",
      icon: Cog,
      description: "AI provides solution or agent takes over conversation",
      color: "bg-secondary",
      details: [
        "Automated responses",
        "Agent assistance",
        "Ticket creation"
      ]
    },
    {
      title: "Workflow Automation",
      icon: Cog,
      description: "System executes automated workflows (booking, tickets, etc.)",
      color: "bg-success",
      details: [
        "Service booking",
        "CRM updates",
        "Notification triggers"
      ]
    },
    {
      title: "Follow-up & Feedback",
      icon: Mail,
      description: "System sends confirmation and collects satisfaction feedback",
      color: "bg-primary",
      details: [
        "Email confirmations",
        "CSAT surveys",
        "Continuous learning"
      ]
    },
    {
      title: "Resolution Complete",
      icon: CheckCircle,
      description: "Issue resolved and data logged for analytics",
      color: "bg-success",
      details: [
        "Analytics logging",
        "Performance tracking",
        "Improvement insights"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Process Flow Visualization
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            End-to-end customer service workflow powered by AI intelligence
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="relative max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative mb-8">
                {/* Step Card */}
                <Card className="glass hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-muted-foreground">
                            STEP {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        
                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step Number Badge */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {index + 1}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow Connector */}
                {!isLast && (
                  <div className="flex justify-center my-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-secondary to-primary rounded-full relative">
                      <ArrowRight className="w-6 h-6 text-secondary absolute -bottom-8 left-1/2 transform -translate-x-1/2 rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <Card className="glass mt-12 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Color Legend</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg"></div>
                <div>
                  <p className="font-semibold">AI Processes</p>
                  <p className="text-sm text-muted-foreground">Automated steps</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning rounded-lg"></div>
                <div>
                  <p className="font-semibold">Analysis</p>
                  <p className="text-sm text-muted-foreground">Intelligence layer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
                <div>
                  <p className="font-semibold">Decision Points</p>
                  <p className="text-sm text-muted-foreground">Logic routing</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-lg"></div>
                <div>
                  <p className="font-semibold">Completion</p>
                  <p className="text-sm text-muted-foreground">Success state</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProcessFlow;
