import { Language } from '@/data/languages';
import { Problem } from '@/data/problems';

// AI solution templates for different problems
const aiSolutions: Record<number, Record<Language, string>> = {
  1: { // Two Sum
    javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
    java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
    go: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, ok := seen[complement]; ok {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return nil
}`,
    rust: `use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::new();
        for (i, &num) in nums.iter().enumerate() {
            let complement = target - num;
            if let Some(&j) = map.get(&complement) {
                return vec![j as i32, i as i32];
            }
            map.insert(num, i);
        }
        vec![]
    }
}`,
  },
  2: { // Reverse Linked List
    javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    python: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
    cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
    java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    go: `func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    curr := head
    for curr != nil {
        next := curr.Next
        curr.Next = prev
        prev = curr
        curr = next
    }
    return prev
}`,
    rust: `impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut prev = None;
        let mut curr = head;
        while let Some(mut node) = curr {
            curr = node.next.take();
            node.next = prev;
            prev = Some(node);
        }
        prev
    }
}`,
  },
  3: { // Valid Parentheses
    javascript: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
    python: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}};
        
        for (char c : s) {
            if (pairs.count(c)) {
                if (st.empty() || st.top() != pairs[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
    java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = Map.of(')', '(', '}', '{', ']', '[');
        
        for (char c : s.toCharArray()) {
            if (pairs.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`,
    go: `func isValid(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}
    
    for _, c := range s {
        if open, ok := pairs[c]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != open {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, c)
        }
    }
    return len(stack) == 0
}`,
    rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        let mut stack = Vec::new();
        
        for c in s.chars() {
            match c {
                '(' | '{' | '[' => stack.push(c),
                ')' => if stack.pop() != Some('(') { return false },
                '}' => if stack.pop() != Some('{') { return false },
                ']' => if stack.pop() != Some('[') { return false },
                _ => {}
            }
        }
        stack.is_empty()
    }
}`,
  },
  4: { // Maximum Subarray
    javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    python: `def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
    java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
    go: `func maxSubArray(nums []int) int {
    maxSum := nums[0]
    currentSum := nums[0]
    
    for i := 1; i < len(nums); i++ {
        if currentSum+nums[i] > nums[i] {
            currentSum = currentSum + nums[i]
        } else {
            currentSum = nums[i]
        }
        if currentSum > maxSum {
            maxSum = currentSum
        }
    }
    return maxSum
}`,
    rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        let mut max_sum = nums[0];
        let mut current_sum = nums[0];
        
        for &num in &nums[1..] {
            current_sum = num.max(current_sum + num);
            max_sum = max_sum.max(current_sum);
        }
        max_sum
    }
}`,
  },
  5: { // Binary Search
    javascript: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    go: `func search(nums []int, target int) int {
    left, right := 0, len(nums)-1
    
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}`,
    rust: `impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let (mut left, mut right) = (0i32, nums.len() as i32 - 1);
        
        while left <= right {
            let mid = left + (right - left) / 2;
            match nums[mid as usize].cmp(&target) {
                std::cmp::Ordering::Equal => return mid,
                std::cmp::Ordering::Less => left = mid + 1,
                std::cmp::Ordering::Greater => right = mid - 1,
            }
        }
        -1
    }
}`,
  },
  // Default fallback for other problems
};

export const getAISolution = (problem: Problem, language: Language): string => {
  const problemSolutions = aiSolutions[problem.id];
  if (problemSolutions && problemSolutions[language]) {
    return problemSolutions[language];
  }
  
  // Generic fallback solution
  const fallbacks: Record<Language, string> = {
    javascript: `// AI is solving ${problem.title}...
function solve(input) {
  // Optimized O(n) solution
  const result = [];
  const seen = new Map();
  
  for (const item of input) {
    // Process each element efficiently
    if (!seen.has(item)) {
      seen.set(item, true);
      result.push(item);
    }
  }
  
  return result;
}`,
    python: `# AI is solving ${problem.title}...
def solve(input_data):
    # Optimized O(n) solution
    result = []
    seen = set()
    
    for item in input_data:
        # Process each element efficiently
        if item not in seen:
            seen.add(item)
            result.append(item)
    
    return result`,
    cpp: `// AI is solving ${problem.title}...
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& input) {
        // Optimized O(n) solution
        vector<int> result;
        unordered_set<int> seen;
        
        for (int item : input) {
            if (seen.find(item) == seen.end()) {
                seen.insert(item);
                result.push_back(item);
            }
        }
        return result;
    }
};`,
    java: `// AI is solving ${problem.title}...
import java.util.*;

class Solution {
    public List<Integer> solve(int[] input) {
        // Optimized O(n) solution
        List<Integer> result = new ArrayList<>();
        Set<Integer> seen = new HashSet<>();
        
        for (int item : input) {
            if (!seen.contains(item)) {
                seen.add(item);
                result.add(item);
            }
        }
        return result;
    }
}`,
    go: `// AI is solving ${problem.title}...
func solve(input []int) []int {
    // Optimized O(n) solution
    result := []int{}
    seen := make(map[int]bool)
    
    for _, item := range input {
        if !seen[item] {
            seen[item] = true
            result = append(result, item)
        }
    }
    return result
}`,
    rust: `// AI is solving ${problem.title}...
use std::collections::HashSet;

impl Solution {
    pub fn solve(input: Vec<i32>) -> Vec<i32> {
        // Optimized O(n) solution
        let mut result = Vec::new();
        let mut seen = HashSet::new();
        
        for item in input {
            if !seen.contains(&item) {
                seen.insert(item);
                result.push(item);
            }
        }
        result
    }
}`,
  };

  return fallbacks[language];
};

// Analyze complexity from code patterns
export const analyzeComplexity = (code: string): { time: string; space: string } => {
  const lowerCode = code.toLowerCase();
  
  // Simple heuristic-based analysis
  let timeComplexity = 'O(n)';
  let spaceComplexity = 'O(1)';
  
  // Check for nested loops
  const forCount = (lowerCode.match(/for\s*\(/g) || []).length;
  const whileCount = (lowerCode.match(/while\s*\(/g) || []).length;
  const loopCount = forCount + whileCount;
  
  if (loopCount >= 3) {
    timeComplexity = 'O(n³)';
  } else if (loopCount === 2) {
    timeComplexity = 'O(n²)';
  } else if (loopCount === 1) {
    timeComplexity = 'O(n)';
  }
  
  // Check for binary search patterns
  if (lowerCode.includes('mid') && (lowerCode.includes('left') || lowerCode.includes('right'))) {
    timeComplexity = 'O(log n)';
  }
  
  // Check for sorting
  if (lowerCode.includes('.sort(') || lowerCode.includes('sort(')) {
    timeComplexity = 'O(n log n)';
  }
  
  // Space complexity
  if (lowerCode.includes('map') || lowerCode.includes('set') || lowerCode.includes('dict')) {
    spaceComplexity = 'O(n)';
  } else if (lowerCode.includes('[]') || lowerCode.includes('array') || lowerCode.includes('list')) {
    spaceComplexity = 'O(n)';
  }
  
  return { time: timeComplexity, space: spaceComplexity };
};

// Complexity ranking (lower index = better)
const complexityRank: string[] = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2^n)'];

export const getComplexityRank = (complexity: string): number => {
  const idx = complexityRank.indexOf(complexity);
  return idx === -1 ? 4 : idx; // default to O(n²) if unknown
};

// Compare two complexities: returns -1 if a is better, 1 if b is better, 0 if equal
export const compareComplexity = (a: string, b: string): number => {
  const rankA = getComplexityRank(a);
  const rankB = getComplexityRank(b);
  if (rankA < rankB) return -1;
  if (rankA > rankB) return 1;
  return 0;
};

// Calculate score based on complexity and correctness
export const calculateScore = (
  time: string, 
  space: string, 
  executionTime: number, 
  correctness: number = 1 // 0-1, fraction of tests passed
): number => {
  const timeScores: Record<string, number> = {
    'O(1)': 100,
    'O(log n)': 90,
    'O(n)': 80,
    'O(n log n)': 70,
    'O(n²)': 50,
    'O(n³)': 30,
    'O(2^n)': 10,
  };
  
  const spaceScores: Record<string, number> = {
    'O(1)': 100,
    'O(log n)': 90,
    'O(n)': 70,
    'O(n²)': 40,
  };
  
  const timeScore = timeScores[time] || 50;
  const spaceScore = spaceScores[space] || 50;
  const execScore = Math.max(0, 100 - executionTime / 10);
  const correctnessScore = correctness * 100;
  
  // Correctness is king (40%), then time (25%), space (20%), execution (15%)
  return Math.round(
    correctnessScore * 0.4 + timeScore * 0.25 + spaceScore * 0.2 + execScore * 0.15
  );
};
