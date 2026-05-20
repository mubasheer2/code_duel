import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Send, RotateCcw, User, Bot, FlaskConical, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/arena/CodeEditor';
import ProblemStatement from '@/components/arena/ProblemStatement';
import BattleTimer from '@/components/arena/BattleTimer';
import LanguageSelector from '@/components/arena/LanguageSelector';
import ComplexityDisplay from '@/components/arena/ComplexityDisplay';
import WinnerAnnouncement from '@/components/arena/WinnerAnnouncement';
import TestResults from '@/components/arena/TestResults';
import ProblemSelector from '@/components/arena/ProblemSelector';
import { Problem } from '@/data/problems';
import { Language } from '@/data/languages';
import { analyzeComplexity, calculateScore, compareComplexity } from '@/lib/aiCodeGenerator';
import { runTestCases, RunResults } from '@/lib/codeRunner';
import { generateAICode, validateCodeWithAI } from '@/lib/aiService';
import { getRandomProblem } from '@/data/problemGenerator';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { toast } from 'sonner';

type BattleState = 'idle' | 'countdown' | 'running' | 'submitted' | 'finished';

const Arena = () => {
  const navigate = useNavigate();
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>('javascript');
  const [humanCode, setHumanCode] = useState('');
  const [aiFullCode, setAiFullCode] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState<'human' | 'ai' | 'tie' | null>(null);
  const [showProblemSelector, setShowProblemSelector] = useState(false);
  
  // Complexity states
  const [humanComplexity, setHumanComplexity] = useState({ time: '', space: '' });
  const [aiComplexity, setAiComplexity] = useState({ time: '', space: '' });
  const [humanScore, setHumanScore] = useState(0);
  
  // Test results states
  const [testResults, setTestResults] = useState<RunResults | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [aiScore, setAiScore] = useState(0);

  // AI typing effect
  const { displayedText: aiDisplayedCode, isComplete: aiTypingComplete } = useTypingEffect({
    text: aiFullCode,
    speed: 25,
    startDelay: 1000,
    enabled: battleState === 'running',
  });

  // Initialize battle with optional specific problem
  const [aiGenerating, setAiGenerating] = useState(false);

  const startBattle = useCallback(async (selectedProblem?: Problem) => {
    const newProblem = selectedProblem || getRandomProblem();
    setProblem(newProblem);
    setHumanCode(newProblem.starterCode[language] || '');
    setAiFullCode('// AI is generating solution...');
    setBattleState('countdown');
    setCountdown(3);
    setWinner(null);
    setHumanComplexity({ time: '', space: '' });
    setAiComplexity({ time: '', space: '' });
    setHumanScore(0);
    setAiScore(0);
    setTestResults(null);
    setIsRunningTests(false);
    setAiGenerating(true);

    // Fetch AI solution from backend
    try {
      const code = await generateAICode(newProblem, language);
      setAiFullCode(code);
    } catch (err) {
      console.error('AI generation failed:', err);
      toast.error('AI generation failed, using fallback');
      // Keep the placeholder - AI won't have a real solution
      setAiFullCode(`// AI could not generate a solution\n// Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setAiGenerating(false);
    }
  }, [language]);

  // Countdown effect
  useEffect(() => {
    if (battleState === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (battleState === 'countdown' && countdown === 0) {
      setBattleState('running');
      toast.success('Battle started! Good luck!');
    }
  }, [battleState, countdown]);

  // Analyze AI complexity when typing completes
  useEffect(() => {
    if (aiTypingComplete && aiFullCode && problem && !aiGenerating) {
      const complexity = analyzeComplexity(aiFullCode);
      setAiComplexity(complexity);
      
      if (language === 'javascript') {
        const aiResults = runTestCases(aiFullCode, problem, language);
        const aiCorrectness = aiResults.passedCount / aiResults.totalCount;
        const score = calculateScore(complexity.time, complexity.space, aiResults.totalTime, aiCorrectness);
        setAiScore(score);
      } else {
        // For non-JS, AI-generated code is assumed correct (it was generated to solve the problem)
        const score = calculateScore(complexity.time, complexity.space, 50, 1.0);
        setAiScore(score);
      }
    }
  }, [aiTypingComplete, aiFullCode, problem, language, aiGenerating]);

  // Analyze human code on change
  useEffect(() => {
    if (humanCode && battleState === 'running') {
      const complexity = analyzeComplexity(humanCode);
      setHumanComplexity(complexity);
    }
  }, [humanCode, battleState]);

  // Run tests on code
  const handleRunTests = useCallback(async () => {
    if (!humanCode.trim() || !problem) {
      toast.error('Please write some code first!');
      return;
    }

    setIsRunningTests(true);
    setTestResults(null);
    
    try {
      let results: RunResults;
      if (language === 'javascript') {
        results = runTestCases(humanCode, problem, language);
      } else {
        // Use AI-based validation for non-JS languages
        const aiResults = await validateCodeWithAI(humanCode, problem, language);
        results = aiResults;
      }
      
      setTestResults(results);
      
      if (results.allPassed) {
        toast.success(`All ${results.totalCount} test cases passed!`);
      } else {
        toast.error(`${results.passedCount}/${results.totalCount} test cases passed`);
      }
    } catch (err) {
      console.error('Test run failed:', err);
      toast.error(`Test validation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsRunningTests(false);
    }
  }, [humanCode, problem, language]);

  // Handle submission
  const handleSubmit = useCallback(async () => {
    if (!humanCode.trim() || !problem) {
      toast.error('Please write some code first!');
      return;
    }

    setIsRunningTests(true);
    setTestResults(null);
    
    try {
      let results: RunResults;
      if (language === 'javascript') {
        results = runTestCases(humanCode, problem, language);
      } else {
        results = await validateCodeWithAI(humanCode, problem, language);
      }
      
      setTestResults(results);
      setIsRunningTests(false);
      
      if (!results.allPassed) {
        toast.error(`Failed: ${results.passedCount}/${results.totalCount} test cases passed. Fix your code and try again!`);
        return;
      }

      toast.success('All tests passed! Calculating scores...');
      setBattleState('submitted');
      
      const humanFinalComplexity = analyzeComplexity(humanCode);
      setHumanComplexity(humanFinalComplexity);
      const humanCorrectness = results.passedCount / results.totalCount;
      const hScore = calculateScore(humanFinalComplexity.time, humanFinalComplexity.space, results.totalTime, humanCorrectness);
      setHumanScore(Math.round(hScore));

      setTimeout(() => {
        setBattleState('finished');
        if (hScore > aiScore) {
          setWinner('human');
        } else if (aiScore > hScore) {
          setWinner('ai');
        } else {
          setWinner('tie');
        }
      }, 1500);
    } catch (err) {
      console.error('Submit failed:', err);
      toast.error(`Validation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsRunningTests(false);
    }
  }, [humanCode, problem, language, aiScore]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    toast.error("Time's up!");
    handleSubmit();
  }, [handleSubmit]);

  // Reset battle
  const resetBattle = useCallback(() => {
    setBattleState('idle');
    setProblem(null);
    setHumanCode('');
    setAiFullCode('');
    setWinner(null);
    setHumanComplexity({ time: '', space: '' });
    setAiComplexity({ time: '', space: '' });
    setHumanScore(0);
    setAiScore(0);
    setTestResults(null);
    setIsRunningTests(false);
  }, []);

  // Update code when language changes
  useEffect(() => {
    if (problem && battleState === 'idle') {
      setHumanCode(problem.starterCode[language] || '');
    }
  }, [language, problem, battleState]);

  // Complexity comparison helper
  const getComplexityScore = (humanVal: string, aiVal: string) => {
    const cmp = compareComplexity(humanVal, aiVal);
    return { humanScore: cmp < 0 ? 1 : 0, aiScore: cmp > 0 ? 1 : 0 };
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Header */}
      <header className="border-b border-arena-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-display font-bold text-xl">
              BATTLE <span className="text-primary">ARENA</span>
            </h1>
          </div>

          {battleState === 'idle' && (
            <div className="flex items-center gap-3">
              <LanguageSelector
                selected={language}
                onSelect={setLanguage}
                disabled={battleState !== 'idle'}
              />
              <Button variant="outline" size="sm" onClick={() => setShowProblemSelector(true)}>
                <Search className="w-4 h-4 mr-1" />
                Browse Problems
              </Button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {battleState === 'idle' ? (
              <Button variant="arena" size="lg" onClick={() => startBattle()}>
                <Play className="w-5 h-5" />
                START BATTLE
              </Button>
            ) : battleState === 'running' ? (
              <>
                <Button variant="outline" size="sm" onClick={resetBattle}>
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={handleRunTests}
                  disabled={isRunningTests}
                >
                  <FlaskConical className="w-5 h-5" />
                  RUN TESTS
                </Button>
                <Button variant="arena" size="lg" onClick={handleSubmit} disabled={isRunningTests}>
                  <Send className="w-5 h-5" />
                  SUBMIT
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Countdown overlay */}
        {battleState === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-center"
            >
              <div className="text-9xl font-display font-black text-neon-cyan text-glow-cyan">
                {countdown || 'GO!'}
              </div>
              <div className="text-2xl text-muted-foreground mt-4">
                {countdown > 0 ? 'Get ready...' : 'Battle begins!'}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Idle state */}
        {battleState === 'idle' && !problem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center mb-8">
              <Play className="w-16 h-16 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">Ready to Battle?</h2>
            <p className="text-muted-foreground text-lg max-w-md mb-4">
              Select your programming language and click "Start Battle" for a random challenge, or browse problems to pick one.
            </p>
            <p className="text-sm text-neon-cyan mb-8">
              🤖 AI-powered validation supports all languages!
            </p>
            <div className="flex gap-4">
              <Button variant="arena" size="xl" onClick={() => startBattle()}>
                <Play className="w-6 h-6" />
                RANDOM BATTLE
              </Button>
              <Button variant="outline" size="xl" onClick={() => setShowProblemSelector(true)}>
                <Search className="w-6 h-6" />
                CHOOSE PROBLEM
              </Button>
            </div>
          </motion.div>
        )}

        {/* Battle arena */}
        {(battleState === 'running' || battleState === 'submitted' || battleState === 'finished') && problem && (
          <div className="space-y-6">
            {/* Problem and Timer row */}
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <ProblemStatement problem={problem} />
              </div>
              <div>
                <BattleTimer
                  duration={problem.timeLimit}
                  isRunning={battleState === 'running'}
                  onTimeUp={handleTimeUp}
                />
              </div>
            </div>

            {/* Code editors */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Human editor */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-human/20 border border-human/50 flex items-center justify-center">
                    <User className="w-5 h-5 text-human" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-human">HUMAN</h3>
                    <p className="text-xs text-muted-foreground">Your solution</p>
                  </div>
                </div>
                <div className="h-[400px]">
                  <CodeEditor
                    language={language}
                    value={humanCode}
                    onChange={setHumanCode}
                    readOnly={battleState !== 'running'}
                  />
                </div>
                
                {/* Test Results for Human - moved under human editor */}
                {(testResults || isRunningTests) && (
                  <div className="mt-4">
                    <TestResults results={testResults} isRunning={isRunningTests} />
                  </div>
                )}
              </motion.div>

              {/* AI editor */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-ai/20 border border-ai/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-ai" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-ai">AI OPPONENT</h3>
                    <p className="text-xs text-muted-foreground">
                      {aiGenerating ? 'AI is thinking...' : aiTypingComplete ? 'Solution complete' : 'Typing solution...'}
                    </p>
                  </div>
                </div>
                <div className="h-[400px] relative">
                  <CodeEditor
                    language={language}
                    value={battleState === 'running' ? aiDisplayedCode : aiFullCode}
                    readOnly
                    isAI
                  />
                  {!aiTypingComplete && battleState === 'running' && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-card/80 px-3 py-1.5 rounded-full border border-ai/30">
                      <div className="w-2 h-2 rounded-full bg-ai animate-pulse" />
                      <span className="text-xs text-ai">{aiGenerating ? 'AI thinking...' : 'AI typing...'}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Complexity comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <ComplexityDisplay
                label="Time Complexity"
                humanValue={humanComplexity.time}
                aiValue={aiComplexity.time}
                {...(humanComplexity.time && aiComplexity.time
                  ? getComplexityScore(humanComplexity.time, aiComplexity.time)
                  : { humanScore: 0, aiScore: 0 }
                )}
              />
              <ComplexityDisplay
                label="Space Complexity"
                humanValue={humanComplexity.space}
                aiValue={aiComplexity.space}
                {...(humanComplexity.space && aiComplexity.space
                  ? getComplexityScore(humanComplexity.space, aiComplexity.space)
                  : { humanScore: 0, aiScore: 0 }
                )}
              />
              <div className="bg-card/50 border border-arena-border rounded-lg p-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 text-center uppercase tracking-wider">
                  Total Score
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`text-center p-3 rounded-lg transition-all ${humanScore > aiScore ? 'bg-human/10 border border-human/30' : 'bg-arena-darker'}`}>
                    <div className="text-xs text-human font-medium mb-1">HUMAN</div>
                    <div className="font-display text-3xl font-bold text-foreground">
                      {humanScore}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg transition-all ${aiScore > humanScore ? 'bg-ai/10 border border-ai/30' : 'bg-arena-darker'}`}>
                    <div className="text-xs text-ai font-medium mb-1">AI</div>
                    <div className="font-display text-3xl font-bold text-foreground">
                      {aiScore}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Winner announcement */}
      <WinnerAnnouncement
        winner={winner}
        humanScore={humanScore}
        aiScore={aiScore}
        onClose={() => setWinner(null)}
        onPlayAgain={() => {
          setWinner(null);
          startBattle();
        }}
      />

      {/* Problem selector modal */}
      <ProblemSelector
        isOpen={showProblemSelector}
        onClose={() => setShowProblemSelector(false)}
        onSelect={(p) => startBattle(p)}
        currentProblemId={problem?.id}
      />
    </div>
  );
};

export default Arena;
