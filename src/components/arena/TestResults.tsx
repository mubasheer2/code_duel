import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { RunResults, TestResult } from '@/lib/codeRunner';
import { cn } from '@/lib/utils';

interface TestResultsProps {
  results: RunResults | null;
  isRunning: boolean;
}

const TestCaseItem = ({ result, index }: { result: TestResult; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(!result.passed);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "border rounded-lg overflow-hidden",
        result.passed 
          ? "border-green-500/30 bg-green-500/5" 
          : "border-red-500/30 bg-red-500/5"
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {result.passed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="font-medium text-sm">
            Test Case {index + 1}
          </span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            result.passed 
              ? "bg-green-500/20 text-green-400" 
              : "bg-red-500/20 text-red-400"
          )}>
            {result.passed ? 'PASSED' : 'FAILED'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {result.executionTime.toFixed(2)}ms
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-arena-border"
          >
            <div className="p-3 space-y-2 text-sm font-mono">
              <div>
                <span className="text-muted-foreground">Input: </span>
                <span className="text-foreground">{result.input}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Expected: </span>
                <span className="text-green-400">{result.expectedOutput}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Output: </span>
                <span className={result.passed ? "text-green-400" : "text-red-400"}>
                  {result.actualOutput}
                </span>
              </div>
              {result.error && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  {result.error}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TestResults = ({ results, isRunning }: TestResultsProps) => {
  if (isRunning) {
    return (
      <div className="bg-card/50 border border-arena-border rounded-lg p-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Running test cases...</span>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 border border-arena-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className={cn(
        "p-4 border-b border-arena-border",
        results.allPassed 
          ? "bg-green-500/10" 
          : "bg-red-500/10"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {results.allPassed ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            <div>
              <h3 className="font-display font-bold text-lg">
                {results.allPassed ? 'All Tests Passed!' : 'Some Tests Failed'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {results.passedCount} / {results.totalCount} test cases passed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-display">
              {Math.round((results.passedCount / results.totalCount) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Total: {results.totalTime.toFixed(2)}ms
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-arena-darker rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(results.passedCount / results.totalCount) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              results.allPassed ? "bg-green-500" : "bg-gradient-to-r from-green-500 to-red-500"
            )}
          />
        </div>
      </div>
      
      {/* Test cases */}
      <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
        {results.results.map((result, index) => (
          <TestCaseItem key={index} result={result} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default TestResults;
