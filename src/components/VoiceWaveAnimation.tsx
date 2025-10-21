import { motion } from "framer-motion";

const VoiceWaveAnimation = () => {
  const bars = Array.from({ length: 5 });

  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-secondary rounded-full"
          animate={{
            height: ["8px", "24px", "8px"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveAnimation;
