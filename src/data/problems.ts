export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  timeLimit: number; // in seconds
  hints?: string[];
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      go: `func twoSum(nums []int, target int) []int {
    // Your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Your code here
        vec![]
    }
}`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" }
    ],
    timeLimit: 300
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: {
      javascript: `function reverseList(head) {
  // Your code here
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Your code here
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Your code here
    }
}`,
      go: `func reverseList(head *ListNode) *ListNode {
    // Your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Your code here
        None
    }
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" },
      { input: "[]", expectedOutput: "[]" }
    ],
    timeLimit: 300
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Your code here
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
      go: `func isValid(s string) bool {
    // Your code here
    return false
}`,
      rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        // Your code here
        false
    }
}`
    },
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" }
    ],
    timeLimit: 300
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Your code here
}`,
      python: `def max_sub_array(nums):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
    }
}`,
      go: `func maxSubArray(nums []int) int {
    // Your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // Your code here
        0
    }
}`
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" }
    ],
    timeLimit: 300
  },
  {
    id: 5,
    title: "Binary Search",
    difficulty: "Easy",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
}`,
      python: `def search(nums, target):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
    }
}`,
      go: `func search(nums []int, target int) int {
    // Your code here
    return -1
}`,
      rust: `impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        // Your code here
        -1
    }
}`
    },
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" }
    ],
    timeLimit: 300
  },
  {
    id: 6,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  // Your code here
}`,
      python: `def merge_two_lists(list1, list2):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Your code here
    }
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
    }
}`,
      go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    // Your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Your code here
        None
    }
}`
    },
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[], []", expectedOutput: "[]" },
      { input: "[], [0]", expectedOutput: "[0]" }
    ],
    timeLimit: 300
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top: 1. 1+1+1, 2. 1+2, 3. 2+1"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Your code here
}`,
      python: `def climb_stairs(n):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Your code here
    }
}`,
      go: `func climbStairs(n int) int {
    // Your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn climb_stairs(n: i32) -> i32 {
        // Your code here
        0
    }
}`
    },
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "4", expectedOutput: "5" }
    ],
    timeLimit: 300
  },
  {
    id: 8,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"'
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings."
      }
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters."
    ],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  // Your code here
}`,
      python: `def longest_common_prefix(strs):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Your code here
    }
};`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Your code here
    }
}`,
      go: `func longestCommonPrefix(strs []string) string {
    // Your code here
    return ""
}`,
      rust: `impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        // Your code here
        String::new()
    }
}`
    },
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: '"fl"' },
      { input: '["dog","racecar","car"]', expectedOutput: '""' }
    ],
    timeLimit: 300
  },
  {
    id: 9,
    title: "Container With Most Water",
    difficulty: "Medium",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    starterCode: {
      javascript: `function maxArea(height) {
  // Your code here
}`,
      python: `def max_area(height):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Your code here
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
    }
}`,
      go: `func maxArea(height []int) int {
    // Your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        // Your code here
        0
    }
}`
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { input: "[1,1]", expectedOutput: "1" }
    ],
    timeLimit: 300
  },
  {
    id: 10,
    title: "3Sum",
    difficulty: "Medium",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Your code here
}`,
      python: `def three_sum(nums):
    # Your code here
    pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Your code here
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Your code here
    }
}`,
      go: `func threeSum(nums []int) [][]int {
    // Your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Your code here
        vec![]
    }
}`
    },
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,1,1]", expectedOutput: "[]" },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" }
    ],
    timeLimit: 300
  }
];

export const getRandomProblem = (): Problem => {
  const randomIndex = Math.floor(Math.random() * problems.length);
  return problems[randomIndex];
};

export const getProblemById = (id: number): Problem | undefined => {
  return problems.find(p => p.id === id);
};
