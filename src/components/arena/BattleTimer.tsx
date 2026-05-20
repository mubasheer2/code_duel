import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';
import { useEffect } from 'react';

interface BattleTimerProps {
  duration: number;
  isRunning: boolean;
  onTimeUp: () => void;
  onStart?: () => void;
}

const BattleTimer = ({ duration, isRunning, onTimeUp }: BattleTimerProps) => {
  const { timeLeft, formattedTime, start, pause } = useTimer({
    initialTime: duration,
    onTimeUp,
  });

  useEffect(() => {
    if (isRunning) {
      start();
    } else {
      pause();
    }
  }, [isRunning, start, pause]);

  const progress = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 60;
  const isCritical = timeLeft <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative flex flex-col items-center p-6 rounded-xl border transition-all duration-300 ${
        isCritical
          ? 'bg-destructive/10 border-destructive/50'
          : isLowTime
          ? 'bg-neon-orange/10 border-neon-orange/50'
          : 'bg-card/50 border-arena-border'
      }`}
    >
      {/* Timer icon */}
      <div className={`mb-3 ${isCritical ? 'animate-pulse' : ''}`}>
        {isCritical ? (
          <AlertCircle className="w-8 h-8 text-destructive" />
        ) : (
          <Clock className={`w-8 h-8 ${isLowTime ? 'text-neon-orange' : 'text-neon-cyan'}`} />
        )}
      </div>

      {/* Time display */}
      <div
        className={`font-display text-5xl font-black tracking-wider ${
          isCritical
            ? 'text-destructive text-glow-cyan'
            : isLowTime
            ? 'text-neon-orange'
            : 'text-neon-cyan text-glow-cyan'
        }`}
      >
        {formattedTime}
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-arena-darker rounded-full mt-4 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isCritical
              ? 'bg-destructive'
              : isLowTime
              ? 'bg-neon-orange'
              : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Status text */}
      <p className="mt-3 text-sm text-muted-foreground font-medium">
        {isCritical ? 'HURRY UP!' : isLowTime ? 'Time running low!' : 'Time remaining'}
      </p>
    </motion.div>
  );
};

export default BattleTimer;
