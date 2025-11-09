import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-vw"
    >
      {/* VW Logo Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
          >
            <Car className="w-16 h-16 text-white" />
          </motion.div>
          
          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-4 border-white"
          />
          <motion.div
            animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full border-4 border-white"
          />
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Provolx
      </motion.h1>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-white rounded-full"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 mt-4"
      >
        Loading AI Intelligence...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
