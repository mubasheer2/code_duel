import { Problem } from '@/data/problems';
import { Language } from '@/data/languages';

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
  executionTime: number;
}

export interface RunResults {
  allPassed: boolean;
  results: TestResult[];
  totalTime: number;
  passedCount: number;
  totalCount: number;
}

// Safe JavaScript code execution using Function constructor
const executeJavaScript = (code: string, functionName: string, args: any[]): { result: any; error?: string; time: number } => {
  const startTime = performance.now();
  
  try {
    // Create a sandboxed function
    const wrappedCode = `
      ${code}
      return typeof ${functionName} === 'function' ? ${functionName} : null;
    `;
    
    const func = new Function(wrappedCode)();
    
    if (!func) {
      return { 
        result: undefined, 
        error: `Function "${functionName}" not found in your code`, 
        time: performance.now() - startTime 
      };
    }
    
    const result = func(...args);
    return { result, time: performance.now() - startTime };
  } catch (error) {
    return { 
      result: undefined, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      time: performance.now() - startTime 
    };
  }
};

// Parse test input string to arguments
const parseTestInput = (input: string, problemId: number): any[] => {
  try {
    // Handle different input formats based on problem
    switch (problemId) {
      case 1: // Two Sum: "[2,7,11,15], 9"
        const twoSumMatch = input.match(/\[(.*?)\],\s*(-?\d+)/);
        if (twoSumMatch) {
          const nums = JSON.parse(`[${twoSumMatch[1]}]`);
          const target = parseInt(twoSumMatch[2]);
          return [nums, target];
        }
        break;
        
      case 3: // Valid Parentheses: '"()"'
        const cleaned = input.replace(/^"|"$/g, '');
        return [cleaned];
        
      case 4: // Maximum Subarray: "[-2,1,-3,4,-1,2,1,-5,4]"
        return [JSON.parse(input)];
        
      case 5: // Binary Search: "[-1,0,3,5,9,12], 9"
        const bsMatch = input.match(/\[(.*?)\],\s*(-?\d+)/);
        if (bsMatch) {
          const nums = JSON.parse(`[${bsMatch[1]}]`);
          const target = parseInt(bsMatch[2]);
          return [nums, target];
        }
        break;
        
      case 7: // Climbing Stairs: "2"
        return [parseInt(input)];
        
      case 8: // Longest Common Prefix: '["flower","flow","flight"]'
        return [JSON.parse(input)];
        
      case 9: // Container With Most Water: "[1,8,6,2,5,4,8,3,7]"
        return [JSON.parse(input)];
        
      case 10: // Fibonacci Number: "4"
        return [parseInt(input)];
        
      default:
        // Try to parse as JSON array or single value
        try {
          const parsed = JSON.parse(input);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return [input];
        }
    }
  } catch (error) {
    console.error('Failed to parse test input:', input, error);
  }
  
  return [input];
};

// Normalize output for comparison
const normalizeOutput = (output: any): string => {
  if (output === undefined || output === null) {
    return 'undefined';
  }
  
  if (Array.isArray(output)) {
    return JSON.stringify(output.sort((a, b) => a - b));
  }
  
  if (typeof output === 'boolean') {
    return output.toString();
  }
  
  if (typeof output === 'string') {
    return `"${output}"`;
  }
  
  return JSON.stringify(output);
};

// Get function name based on problem
const getFunctionName = (problemId: number): string => {
  const functionNames: Record<number, string> = {
    1: 'twoSum',
    2: 'reverseList',
    3: 'isValid',
    4: 'maxSubArray',
    5: 'search',
    6: 'mergeTwoLists',
    7: 'climbStairs',
    8: 'longestCommonPrefix',
    9: 'maxArea',
    10: 'fib',
  };
  
  return functionNames[problemId] || 'solve';
};

// Run test cases for JavaScript only (browser limitation)
export const runTestCases = (code: string, problem: Problem, language: Language): RunResults => {
  const results: TestResult[] = [];
  let totalTime = 0;
  
  // Only JavaScript can be executed in browser
  if (language !== 'javascript') {
    return {
      allPassed: false,
      results: problem.testCases.map(tc => ({
        passed: false,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: '⚠️ Only JavaScript can be validated in the browser. Please select JavaScript to run test cases.',
        error: 'Browser execution only supports JavaScript',
        executionTime: 0,
      })),
      totalTime: 0,
      passedCount: 0,
      totalCount: problem.testCases.length,
    };
  }
  
  const functionName = getFunctionName(problem.id);
  
  for (const testCase of problem.testCases) {
    const args = parseTestInput(testCase.input, problem.id);
    const { result, error, time } = executeJavaScript(code, functionName, args);
    
    totalTime += time;
    
    const actualOutput = error ? `Error: ${error}` : normalizeOutput(result);
    const expectedNormalized = testCase.expectedOutput.replace(/^"|"$/g, '');
    
    // Compare outputs (handle array ordering for some problems)
    let passed = false;
    if (!error) {
      if (problem.id === 1) {
        // Two Sum: order doesn't matter for the indices
        const actual = Array.isArray(result) ? result.sort((a: number, b: number) => a - b) : result;
        const expected = JSON.parse(testCase.expectedOutput).sort((a: number, b: number) => a - b);
        passed = JSON.stringify(actual) === JSON.stringify(expected);
      } else if (typeof result === 'boolean') {
        passed = result.toString() === expectedNormalized;
      } else if (typeof result === 'number') {
        passed = result.toString() === expectedNormalized;
      } else if (typeof result === 'string') {
        passed = result === expectedNormalized || `"${result}"` === testCase.expectedOutput;
      } else {
        passed = actualOutput === testCase.expectedOutput;
      }
    }
    
    results.push({
      passed,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput,
      error,
      executionTime: time,
    });
  }
  
  const passedCount = results.filter(r => r.passed).length;
  
  return {
    allPassed: passedCount === results.length,
    results,
    totalTime,
    passedCount,
    totalCount: results.length,
  };
};
