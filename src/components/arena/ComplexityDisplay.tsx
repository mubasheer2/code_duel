import { motion } from 'framer-motion';

interface ComplexityDisplayProps {
  label: string;
  humanValue: string;
  aiValue: string;
  humanScore?: number;
  aiScore?: number;
}

const ComplexityDisplay = ({ label, humanValue, aiValue, humanScore = 0, aiScore = 0 }: ComplexityDisplayProps) => {
  const humanWinning = humanScore > aiScore;
  const aiWinning = aiScore > humanScore;
  const tie = humanScore === aiScore && humanScore > 0;

  return (
    <div className="bg-card/50 border border-arena-border rounded-lg p-4">
      <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center uppercase tracking-wider">
        {label}
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Human */}
        <div className={`text-center p-3 rounded-lg transition-all ${humanWinning ? 'bg-human/10 border border-human/30' : 'bg-arena-darker'}`}>
          <div className="text-xs text-human font-medium mb-1">HUMAN</div>
          <motion.div
            key={humanValue}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-lg font-bold text-foreground"
          >
            {humanValue || '—'}
          </motion.div>
          {humanWinning && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs text-human mt-1"
            >
              ✓ Better
            </motion.div>
          )}
        </div>

        {/* AI */}
        <div className={`text-center p-3 rounded-lg transition-all ${aiWinning ? 'bg-ai/10 border border-ai/30' : 'bg-arena-darker'}`}>
          <div className="text-xs text-ai font-medium mb-1">AI</div>
          <motion.div
            key={aiValue}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-lg font-bold text-foreground"
          >
            {aiValue || '—'}
          </motion.div>
          {aiWinning && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs text-ai mt-1"
            >
              ✓ Better
            </motion.div>
          )}
        </div>
      </div>

      {tie && (
        <div className="text-center text-xs text-muted-foreground mt-2">
          It's a tie!
        </div>
      )}
    </div>
  );
};

export default ComplexityDisplay;
