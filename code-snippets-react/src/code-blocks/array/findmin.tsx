export const findMinProblem = {
  id: 'findmin',
  title: 'Search array and find min',
  category: 'Arrays',
  intuition:
    'Walk through the array from left to right, remember the smallest value seen so far, and return that minimum at the end.',
  steps: [
    'Keep the first value as the running minimum.',
    'Scan each item and update the minimum when a smaller value appears.',
    'Return the smallest value found after the loop.',
  ],
  code:
    "function findMin(nums: number[]): number | undefined {\n  if (nums.length === 0) return undefined;\n\n  let res = nums[0];\n  for (let i = 1; i < nums.length; i += 1) {\n    if (nums[i] < res) {\n      res = nums[i];\n    }\n  }\n\n  return res;\n}\n\nconst sample = [8, 3, 5, 1, 4];\nconsole.log(findMin(sample)); // 1",
}
