import { motion } from "framer-motion";
import { Smile, Meh, Frown } from "lucide-react";

interface SentimentGaugeProps {
  sentiment: number; // -100 to 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const SentimentGauge = ({ sentiment, size = "md", showLabel = true }: SentimentGaugeProps) => {
  const normalizedSentiment = Math.max(-100, Math.min(100, sentiment));
  const percentage = ((normalizedSentiment + 100) / 200) * 100;
  
  const getColor = () => {
    if (normalizedSentiment > 30) return "hsl(var(--success))";
    if (normalizedSentiment < -30) return "hsl(var(--destructive))";
    return "hsl(var(--warning))";
  };

  const getIcon = () => {
    if (normalizedSentiment > 30) return Smile;
    if (normalizedSentiment < -30) return Frown;
    return Meh;
  };

  const getLabel = () => {
    if (normalizedSentiment > 30) return "Positive";
    if (normalizedSentiment < -30) return "Negative";
    return "Neutral";
  };

  const sizes = {
    sm: { gauge: "h-2", container: "w-32" },
    md: { gauge: "h-3", container: "w-48" },
    lg: { gauge: "h-4", container: "w-64" }
  };

  const Icon = getIcon();

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: getColor() }} />
            <span className="text-sm font-semibold" style={{ color: getColor() }}>
              {getLabel()}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{normalizedSentiment > 0 ? '+' : ''}{normalizedSentiment}</span>
        </div>
      )}
      
      <div className={`${sizes[size].container} ${sizes[size].gauge} bg-muted rounded-full overflow-hidden relative`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, type: "spring" }}
          className="h-full rounded-full"
          style={{ backgroundColor: getColor() }}
        />
        
        {/* Indicator marker */}
        <motion.div
          initial={{ left: "50%" }}
          animate={{ left: `${percentage}%` }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute top-0 w-1 h-full bg-foreground/30"
        />
      </div>
    </div>
  );
};

export default SentimentGauge;
