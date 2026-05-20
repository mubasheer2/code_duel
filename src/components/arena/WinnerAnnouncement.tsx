import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Frown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface WinnerAnnouncementProps {
  winner: 'human' | 'ai' | 'tie' | null;
  humanScore: number;
  aiScore: number;
  onClose: () => void;
  onPlayAgain: () => void;
}

const WinnerAnnouncement = ({ winner, humanScore, aiScore, onClose, onPlayAgain }: WinnerAnnouncementProps) => {
  useEffect(() => {
    if (winner === 'human') {
      // Trigger confetti for human victory
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00f0ff', '#00ff88', '#ffffff'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00f0ff', '#00ff88', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [winner]);

  if (!winner) return null;

  const content = {
    human: {
      icon: Trophy,
      title: 'VICTORY!',
      subtitle: 'Human Intelligence Prevails!',
      color: 'text-winner',
      glow: 'text-glow-green',
      bgGlow: 'from-neon-green/20 to-neon-cyan/20',
    },
    ai: {
      icon: Frown,
      title: 'DEFEAT',
      subtitle: 'The AI was faster this time...',
      color: 'text-ai',
      glow: 'text-glow-magenta',
      bgGlow: 'from-neon-magenta/20 to-accent/20',
    },
    tie: {
      icon: Medal,
      title: "IT'S A TIE!",
      subtitle: 'An evenly matched battle!',
      color: 'text-neon-orange',
      glow: '',
      bgGlow: 'from-neon-orange/20 to-winner/20',
    },
  };

  const { icon: Icon, title, subtitle, color, glow, bgGlow } = content[winner];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative max-w-lg w-full bg-gradient-to-br ${bgGlow} p-8 rounded-2xl border border-arena-border shadow-2xl`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Icon */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <Icon className={`w-24 h-24 ${color}`} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-5xl font-display font-black text-center mb-2 ${color} ${glow}`}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground text-lg mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Scores */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <div className="bg-card/50 rounded-lg p-4 text-center border border-human/30">
              <div className="text-sm text-human font-medium mb-1">HUMAN SCORE</div>
              <div className="text-3xl font-display font-bold text-foreground">{humanScore}</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 text-center border border-ai/30">
              <div className="text-sm text-ai font-medium mb-1">AI SCORE</div>
              <div className="text-3xl font-display font-bold text-foreground">{aiScore}</div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button variant="arena" size="lg" onClick={onPlayAgain}>
              Play Again
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              View Results
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinnerAnnouncement;
