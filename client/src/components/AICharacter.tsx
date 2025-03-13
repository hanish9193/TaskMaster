import { FC } from "react";
import { useMessages } from "@/hooks/useRespect";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface AICharacterProps {
  respectLevel: number;
  aiPersonality: string;
  streak: number;
  bestStreak: number;
  isLoading: boolean;
}

const AICharacter: FC<AICharacterProps> = ({
  respectLevel,
  aiPersonality,
  streak,
  bestStreak,
  isLoading
}) => {
  const currentAIMessage = useMessages(respectLevel, aiPersonality);
  
  if (isLoading) {
    return (
      <div className="card-glass shadow-xl overflow-hidden border-gray-800/30">
        <Skeleton className="h-60 w-full bg-gray-900/50" />
        <div className="p-6">
          <Skeleton className="h-24 w-full mb-4 bg-gray-900/50" />
          <Skeleton className="h-4 w-full mb-2 bg-gray-900/50" />
          <Skeleton className="h-4 w-3/4 mb-6 bg-gray-900/50" />
          <Skeleton className="h-12 w-full bg-gray-900/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass shadow-xl overflow-hidden border-gray-800/30">
      {/* AI Character Display */}
      <div className="relative h-64 flex justify-center items-center glassmorphism">
        {respectLevel >= 70 && (
          <motion.div 
            className="absolute"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* High Respect AI - Professional, Futuristic AI Interface */}
            <svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-glow">
              {/* Background elements */}
              <motion.circle 
                cx="120" cy="110" r="90" 
                fill="url(#highRespectGlow)" 
                fillOpacity="0.2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              {/* AI Core - Digital brain visualization */}
              <motion.path
                d="M120 50 C80 50 60 100 60 120 C60 140 80 170 120 170 C160 170 180 140 180 120 C180 100 160 50 120 50 Z"
                fill="url(#coreGradient)"
                strokeWidth="1"
                stroke="rgba(59, 130, 246, 0.5)"
                animate={{ 
                  stroke: ["rgba(59, 130, 246, 0.5)", "rgba(99, 102, 241, 0.7)", "rgba(59, 130, 246, 0.5)"]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              
              {/* Circuit patterns */}
              <motion.path
                d="M70 110 L90 110 L100 100 L140 100 L150 110 L170 110"
                stroke="rgba(147, 197, 253, 0.8)"
                strokeWidth="1"
                fill="none"
                animate={{ 
                  strokeDashoffset: [0, 100],
                  stroke: ["rgba(147, 197, 253, 0.8)", "rgba(191, 219, 254, 0.9)", "rgba(147, 197, 253, 0.8)"]
                }}
                strokeDasharray="100"
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              <motion.path
                d="M70 130 L85 130 L95 140 L145 140 L155 130 L170 130"
                stroke="rgba(147, 197, 253, 0.8)"
                strokeWidth="1"
                fill="none"
                animate={{ 
                  strokeDashoffset: [100, 0],
                  stroke: ["rgba(147, 197, 253, 0.8)", "rgba(191, 219, 254, 0.9)", "rgba(147, 197, 253, 0.8)"]
                }}
                strokeDasharray="100"
                transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              />
              
              {/* Digital pulses */}
              <motion.circle
                cx="100" cy="90"
                r="3"
                fill="#3B82F6"
                animate={{ 
                  r: [3, 5, 3],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              
              <motion.circle
                cx="140" cy="90"
                r="3"
                fill="#3B82F6"
                animate={{ 
                  r: [3, 5, 3],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
              
              {/* Data visualization elements */}
              <motion.path
                d="M90 80 L90 70 L100 70 L100 80 M120 80 L120 60 L130 60 L130 80 M150 80 L150 75 L160 75 L160 80"
                stroke="rgba(191, 219, 254, 0.9)"
                strokeWidth="1.5"
                fill="none"
                animate={{ 
                  strokeWidth: [1.5, 2, 1.5],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              
              {/* Animated interface elements */}
              <motion.rect
                x="85" y="150"
                width="70" height="4"
                rx="2"
                fill="rgba(59, 130, 246, 0.8)"
                animate={{ 
                  width: [70, 100, 70],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              <motion.rect
                x="95" y="160"
                width="50" height="3"
                rx="1.5"
                fill="rgba(59, 130, 246, 0.6)"
                animate={{ 
                  width: [50, 70, 50],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
              
              {/* Holographic display effect */}
              <motion.path
                d="M90 120 Q120 105 150 120 Q120 135 90 120 Z"
                fill="rgba(96, 165, 250, 0.3)"
                animate={{ 
                  fill: ["rgba(96, 165, 250, 0.3)", "rgba(147, 197, 253, 0.4)", "rgba(96, 165, 250, 0.3)"],
                  d: [
                    "M90 120 Q120 105 150 120 Q120 135 90 120 Z",
                    "M85 120 Q120 100 155 120 Q120 140 85 120 Z",
                    "M90 120 Q120 105 150 120 Q120 135 90 120 Z"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              {/* Pulsing center */}
              <motion.circle
                cx="120" cy="110"
                r="15"
                fill="url(#centerGlow)"
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  r: [15, 18, 15]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              
              {/* Gradient definitions */}
              <defs>
                <radialGradient id="highRespectGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </radialGradient>
                
                <linearGradient id="coreGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1" />
                </linearGradient>
                
                <radialGradient id="centerGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </radialGradient>
              </defs>
            </svg>
            <motion.p 
              className="text-center font-bold text-blue-400 text-xl mt-4 text-glow"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              PERFORMANCE EXCEPTIONAL
            </motion.p>
          </motion.div>
        )}
        
        {respectLevel >= 30 && respectLevel < 70 && (
          <motion.div 
            className="absolute"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Medium Respect AI - Neural Network Visualization */}
            <svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-glow">
              {/* Background elements */}
              <motion.circle 
                cx="120" cy="110" r="90" 
                fill="url(#medRespectGlow)" 
                fillOpacity="0.2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              {/* Neural network nodes and connections */}
              {/* Layer 1 */}
              <motion.circle cx="70" cy="80" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="70" cy="110" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="70" cy="140" r="6" fill="url(#nodeGradient)" />
              
              {/* Layer 2 */}
              <motion.circle cx="120" cy="70" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="120" cy="100" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="120" cy="130" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="120" cy="160" r="6" fill="url(#nodeGradient)" />
              
              {/* Layer 3 */}
              <motion.circle cx="170" cy="80" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="170" cy="110" r="6" fill="url(#nodeGradient)" />
              <motion.circle cx="170" cy="140" r="6" fill="url(#nodeGradient)" />
              
              {/* Connections - first to second layer */}
              <motion.path d="M76 80 L114 70" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" />
              <motion.path d="M76 80 L114 100" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" />
              <motion.path d="M76 80 L114 130" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              
              <motion.path d="M76 110 L114 70" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              <motion.path d="M76 110 L114 100" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="1" />
              <motion.path d="M76 110 L114 130" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" />
              <motion.path d="M76 110 L114 160" stroke="rgba(234, 179, 8, 0.1)" strokeWidth="1" />
              
              <motion.path d="M76 140 L114 100" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              <motion.path d="M76 140 L114 130" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" />
              <motion.path d="M76 140 L114 160" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="1" />
              
              {/* Connections - second to third layer */}
              <motion.path d="M126 70 L164 80" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" />
              <motion.path d="M126 70 L164 110" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              
              <motion.path d="M126 100 L164 80" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" />
              <motion.path d="M126 100 L164 110" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="1" />
              <motion.path d="M126 100 L164 140" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              
              <motion.path d="M126 130 L164 80" stroke="rgba(234, 179, 8, 0.1)" strokeWidth="1" />
              <motion.path d="M126 130 L164 110" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" />
              <motion.path d="M126 130 L164 140" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" />
              
              <motion.path d="M126 160 L164 110" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1" />
              <motion.path d="M126 160 L164 140" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="1" />
              
              {/* Data pulses */}
              <motion.circle 
                cx="95" cy="90" r="3" 
                fill="#EAB308"
                animate={{ 
                  cx: [95, 120, 145],
                  cy: [90, 100, 110],
                  opacity: [0, 1, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
              />
              
              <motion.circle 
                cx="95" cy="125" r="3" 
                fill="#EAB308"
                animate={{ 
                  cx: [95, 120, 145],
                  cy: [125, 130, 125],
                  opacity: [0, 1, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.7, repeatDelay: 0.8 }}
              />
              
              <motion.circle 
                cx="120" cy="115" r="15" 
                fill="url(#medCenterGlow)"
                fillOpacity="0.4"
                animate={{ 
                  r: [15, 18, 15],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              
              {/* Status indicators */}
              <motion.rect 
                x="85" y="175" 
                width="70" height="3" 
                rx="1.5" 
                fill="rgba(234, 179, 8, 0.6)"
                animate={{ width: [70, 85, 70] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              
              <motion.rect 
                x="95" y="183" 
                width="50" height="2" 
                rx="1" 
                fill="rgba(234, 179, 8, 0.4)"
                animate={{ width: [50, 65, 50] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
              />
              
              {/* Gradient definitions */}
              <defs>
                <radialGradient id="medRespectGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#EAB308" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#854D0E" stopOpacity="0" />
                </radialGradient>
                
                <radialGradient id="nodeGradient" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>
                
                <radialGradient id="medCenterGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>
              </defs>
            </svg>
            <motion.p 
              className="text-center font-bold text-amber-400 text-xl mt-4 text-glow"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              SYSTEM EFFICIENCY: MODERATE
            </motion.p>
          </motion.div>
        )}
        
        {respectLevel < 30 && (
          <motion.div 
            className="absolute"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Low Respect AI - Error States and System Warnings */}
            <svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="ai-glow">
              {/* Background elements - error state */}
              <motion.circle 
                cx="120" cy="110" r="90" 
                fill="url(#lowRespectGlow)" 
                fillOpacity="0.2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              {/* Error hexagon */}
              <motion.path
                d="M120 40 L170 70 L170 130 L120 160 L70 130 L70 70 Z"
                stroke="rgba(220, 38, 38, 0.8)"
                strokeWidth="2"
                fill="none"
                animate={{ 
                  strokeWidth: [2, 3, 2],
                  stroke: ["rgba(220, 38, 38, 0.8)", "rgba(239, 68, 68, 0.9)", "rgba(220, 38, 38, 0.8)"]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              
              {/* Warning sign */}
              <motion.path
                d="M120 70 L145 110 L95 110 Z"
                stroke="rgba(220, 38, 38, 0.9)"
                strokeWidth="2"
                fill="rgba(220, 38, 38, 0.3)"
                animate={{ 
                  fill: ["rgba(220, 38, 38, 0.3)", "rgba(239, 68, 68, 0.4)", "rgba(220, 38, 38, 0.3)"]
                }}
                transition={{ repeat: Infinity, duration: 0.7 }}
              />
              
              {/* Exclamation mark */}
              <motion.line
                x1="120" y1="80"
                x2="120" y2="95"
                stroke="white"
                strokeWidth="3"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              <motion.circle
                cx="120" cy="102"
                r="1.5"
                fill="white"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              
              {/* Error status lines */}
              <motion.path
                d="M85 125 L155 125"
                stroke="rgba(220, 38, 38, 0.8)"
                strokeWidth="2"
                strokeDasharray="5,3"
                animate={{ 
                  strokeDashoffset: [0, 16],
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              
              <motion.path
                d="M85 135 L155 135"
                stroke="rgba(220, 38, 38, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                animate={{ 
                  strokeDashoffset: [0, 16],
                }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              />
              
              <motion.path
                d="M85 145 L155 145"
                stroke="rgba(220, 38, 38, 0.4)"
                strokeWidth="1"
                strokeDasharray="3,5"
                animate={{ 
                  strokeDashoffset: [0, 16],
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
              />
              
              {/* Error pulses */}
              <motion.circle 
                cx="120" cy="110" r="25" 
                stroke="rgba(239, 68, 68, 0.8)"
                strokeWidth="2"
                fill="none"
                animate={{ 
                  r: [25, 40, 25],
                  opacity: [0.8, 0, 0.8],
                  strokeWidth: [2, 0, 2]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              <motion.circle 
                cx="120" cy="110" r="15" 
                fill="url(#errorCenterGlow)"
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              
              {/* System error texts */}
              <motion.g
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <rect x="95" y="160" width="50" height="8" rx="2" fill="rgba(220, 38, 38, 0.8)" />
                <rect x="85" y="173" width="70" height="5" rx="1" fill="rgba(220, 38, 38, 0.6)" />
                <rect x="90" y="183" width="60" height="5" rx="1" fill="rgba(220, 38, 38, 0.4)" />
              </motion.g>
              
              {/* Gradient definitions */}
              <defs>
                <radialGradient id="lowRespectGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
                </radialGradient>
                
                <radialGradient id="errorCenterGlow" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </radialGradient>
              </defs>
            </svg>
            <motion.p 
              className="text-center font-bold text-red-500 text-xl mt-4 text-glow"
              animate={{ 
                opacity: [1, 0.3, 1],
                color: ["rgb(239, 68, 68)", "rgb(220, 38, 38)", "rgb(239, 68, 68)"]
              }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              CRITICAL SYSTEM FAILURE
            </motion.p>
          </motion.div>
        )}
      </div>
      
      {/* AI Message */}
      <div className="p-6 glassmorphism">
        <motion.div 
          className="card-glass p-5 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-medium text-card-foreground">{currentAIMessage}</p>
        </motion.div>
        
        {/* Respect Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Respect Level</span>
            <span className="text-sm font-bold">{respectLevel}%</span>
          </div>
          <div className="h-4 relative w-full rounded-full overflow-hidden glassmorphism bg-gray-900/50">
            <motion.div 
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                respectLevel >= 70 
                  ? "bg-blue-500/70" 
                  : (respectLevel >= 30 ? "bg-amber-500/70" : "bg-red-500/70")
              }`}
              initial={{ width: "0%" }}
              animate={{ width: `${respectLevel}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        
        {/* Task Streaks */}
        <div className="mt-6">
          <h3 className="text-sm uppercase tracking-wide font-semibold text-muted-foreground mb-3">Current Streak</h3>
          <div className="flex items-center gap-2">
            <div className="glassmorphism px-4 py-3 rounded-lg">
              <div className="text-center">
                <span className="text-2xl font-bold text-glow text-primary">{streak}</span>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Best streak: <span className="font-semibold">{bestStreak}</span> days</span>
                {streak > 0 && <span className="text-xs text-primary text-glow">Keep going!</span>}
              </div>
              <div className="flex gap-1 mt-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i}
                    className={`flex-1 h-2 rounded ${
                      i < (streak % 7 || 7) ? "bg-primary/70" : "bg-gray-800/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICharacter;
