import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Problem } from '@/data/problems';
import { getAllProblems } from '@/data/problemGenerator';
import { problemBank } from '@/data/problemBank';

interface ProblemSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (problem: Problem) => void;
  currentProblemId?: number;
}

const difficultyColors = {
  Easy: 'bg-neon-green/20 text-neon-green border-neon-green/30',
  Medium: 'bg-neon-orange/20 text-neon-orange border-neon-orange/30',
  Hard: 'bg-destructive/20 text-destructive border-destructive/30',
};

const ProblemSelector = ({ isOpen, onClose, onSelect, currentProblemId }: ProblemSelectorProps) => {
  const [search, setSearch] = useState('');
  const allProblems = useMemo(() => getAllProblems(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allProblems;
    const q = search.toLowerCase();
    return allProblems.filter((p, i) =>
      p.title.toLowerCase().includes(q) ||
      p.difficulty.toLowerCase().includes(q) ||
      p.id.toString() === search.trim() ||
      problemBank[i]?.cat.toLowerCase().includes(q)
    );
  }, [search, allProblems]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border border-arena-border rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-arena-border flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, difficulty, or problem # ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 text-lg"
              autoFocus
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {filtered.map(problem => (
                <button
                  key={problem.id}
                  onClick={() => { onSelect(problem); onClose(); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-primary/10 ${
                    problem.id === currentProblemId ? 'bg-primary/20 border border-primary/30' : ''
                  }`}
                >
                  <span className="flex items-center gap-1 text-muted-foreground font-mono text-sm min-w-[3rem]">
                    <Hash className="w-3 h-3" />{problem.id}
                  </span>
                  <span className="flex-1 font-medium text-foreground">{problem.title}</span>
                  <Badge className={`${difficultyColors[problem.difficulty]} text-xs`}>
                    {problem.difficulty}
                  </Badge>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No problems found matching "{search}"
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t border-arena-border text-center text-xs text-muted-foreground">
            {allProblems.length} problems available
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProblemSelector;
