import { motion } from 'framer-motion';
import { Problem } from '@/data/problems';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProblemStatementProps {
  problem: Problem;
}

const difficultyColors = {
  Easy: 'bg-neon-green/20 text-neon-green border-neon-green/30',
  Medium: 'bg-neon-orange/20 text-neon-orange border-neon-orange/30',
  Hard: 'bg-destructive/20 text-destructive border-destructive/30',
};

const ProblemStatement = ({ problem }: ProblemStatementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 border border-arena-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {problem.title}
        </h2>
        <Badge className={difficultyColors[problem.difficulty]}>
          {problem.difficulty}
        </Badge>
      </div>

      <ScrollArea className="h-32 pr-4">
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {problem.description}
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Examples:</h4>
            {problem.examples.map((example, idx) => (
              <div key={idx} className="bg-arena-darker rounded-lg p-3 mb-2 font-mono text-sm">
                <div className="text-neon-cyan">Input: {example.input}</div>
                <div className="text-neon-green">Output: {example.output}</div>
                {example.explanation && (
                  <div className="text-muted-foreground text-xs mt-1">
                    {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Constraints:</h4>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="font-mono">{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default ProblemStatement;
