import { supabase } from '@/integrations/supabase/client';
import { Problem } from '@/data/problems';
import { Language } from '@/data/languages';
import { RunResults, TestResult } from '@/lib/codeRunner';

export const generateAICode = async (
  problem: Problem,
  language: Language
): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('generate-ai-code', {
    body: {
      problemTitle: problem.title,
      problemDescription: problem.description,
      language,
      testCases: problem.testCases,
    },
  });

  if (error) throw new Error(error.message || 'Failed to generate AI code');
  if (data?.error) throw new Error(data.error);
  return data.code;
};

export const validateCodeWithAI = async (
  code: string,
  problem: Problem,
  language: Language
): Promise<RunResults> => {
  const { data, error } = await supabase.functions.invoke('validate-code', {
    body: {
      code,
      language,
      problemTitle: problem.title,
      problemDescription: problem.description,
      testCases: problem.testCases,
    },
  });

  if (error) throw new Error(error.message || 'Failed to validate code');
  if (data?.error) throw new Error(data.error);

  const results: TestResult[] = problem.testCases.map((tc, i) => {
    const aiResult = data.results?.[i];
    return {
      passed: aiResult?.passed ?? false,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: aiResult?.actualOutput ?? 'AI validation error',
      error: aiResult?.passed === false ? aiResult?.explanation : undefined,
      executionTime: 0,
    };
  });

  const passedCount = results.filter(r => r.passed).length;

  return {
    allPassed: passedCount === results.length,
    results,
    totalTime: 0,
    passedCount,
    totalCount: results.length,
    aiComplexity: {
      time: data.timeComplexity || 'O(n)',
      space: data.spaceComplexity || 'O(n)',
    },
  } as RunResults & { aiComplexity: { time: string; space: string } };
};
