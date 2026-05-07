export const twoSumProblem = {
  id: 'two-sum',
  title: 'Two Sum',
  category: 'Hash Map',
  intuition:
    'PATTERN:\nHashMap lookup\n\nTRIGGER:\nPair sum = target\n\nCORE:\nx + y = target → y = target - x\n\nFLOW:\nloop nums:\n  if (target - nums[i]) in map → done\n  else store nums[i]\n\nNOTE:\nstore after check (avoid same index reuse)\n\nCOMPLEXITY:\nO(n) time, O(n) space',
  steps: [
    'Use a hash map to store values after checking for the complement.',
    'For each number, compute the needed pair value and verify it exists.',
    'Return the pair of indices once found.',
  ],
  code:
    'vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n\n    for (int i = 0; i < nums.size(); i++) {\n        int rem = target - nums[i];\n\n        if (mp.count(rem)) {\n            return {mp[rem], i};\n        }\n\n        mp[nums[i]] = i;\n    }\n\n    return {};\n}',
}
