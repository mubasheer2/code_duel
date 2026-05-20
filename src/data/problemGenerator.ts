import { Problem } from './problems';
import { CompactProblem, problemBank } from './problemBank';

// Convert compact problem to full Problem with auto-generated starter code
function expandProblem(cp: CompactProblem, id: number): Problem {
  const difficultyMap: Record<string, 'Easy' | 'Medium' | 'Hard'> = { E: 'Easy', M: 'Medium', H: 'Hard' };
  const params = cp.params.split(',').filter(Boolean);
  const fnName = cp.fn;
  const pyFnName = fnName.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');

  return {
    id,
    title: cp.t,
    difficulty: difficultyMap[cp.d],
    description: cp.desc,
    examples: cp.ex.map(e => ({ input: e.i, output: e.o, explanation: e.e })),
    constraints: cp.con,
    starterCode: {
      javascript: `function ${fnName}(${params.join(', ')}) {\n  // Your code here\n}`,
      python: `def ${pyFnName}(${params.join(', ')}):\n    # Your code here\n    pass`,
      cpp: `class Solution {\npublic:\n    auto ${fnName}(${params.map(p => `auto ${p}`).join(', ')}) {\n        // Your code here\n    }\n};`,
      java: `class Solution {\n    public Object ${fnName}(${params.map(p => `Object ${p}`).join(', ')}) {\n        // Your code here\n        return null;\n    }\n}`,
      go: `func ${fnName}(${params.map(p => `${p} interface{}`).join(', ')}) interface{} {\n    // Your code here\n    return nil\n}`,
      rust: `impl Solution {\n    pub fn ${pyFnName}(${params.map(p => `${p}: impl Into<String>`).join(', ')}) -> String {\n        // Your code here\n        String::new()\n    }\n}`,
    },
    testCases: cp.tc.map(tc => ({ input: tc.i, expectedOutput: tc.o })),
    timeLimit: 300,
    hints: [],
  };
}

// Generate all problems from the bank
let allProblems: Problem[] | null = null;

export function getAllProblems(): Problem[] {
  if (!allProblems) {
    allProblems = problemBank.map((cp, i) => expandProblem(cp, i + 1));
  }
  return allProblems;
}

// Get categories
export function getCategories(): string[] {
  const cats = new Set(problemBank.map(p => p.cat));
  return Array.from(cats);
}

// Track used problems in session
const usedProblems = new Set<number>();

export function getRandomProblem(): Problem {
  const problems = getAllProblems();
  const available = problems.filter(p => !usedProblems.has(p.id));
  
  if (available.length === 0) {
    usedProblems.clear();
    return problems[Math.floor(Math.random() * problems.length)];
  }
  
  const problem = available[Math.floor(Math.random() * available.length)];
  usedProblems.add(problem.id);
  return problem;
}

export function getProblemById(id: number): Problem | undefined {
  return getAllProblems().find(p => p.id === id);
}

export function getProblemsByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] {
  return getAllProblems().filter(p => p.difficulty === difficulty);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problemBank
    .map((cp, i) => ({ cp, i }))
    .filter(({ cp }) => cp.cat === category)
    .map(({ i }) => getAllProblems()[i]);
}

export function searchProblems(query: string): Problem[] {
  const q = query.toLowerCase();
  const all = getAllProblems();
  return all.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.difficulty.toLowerCase().includes(q) ||
    p.id.toString() === q ||
    problemBank[p.id - 1]?.cat.toLowerCase().includes(q)
  );
}

export function getTotalProblemCount(): number {
  return problemBank.length;
}
