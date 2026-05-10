import { twoSumProblem } from '../code-blocks/array/twosum'
import type { StudyReelProblem } from '../components/study-reel-card/StudyReelCard'

const createReelCategory = (short: string, label: string): StudyReelProblem['category'] => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  short,
  label,
})

export const studyReelProblems: StudyReelProblem[] = [
  {
    uniqueId: 'reel-two-sum',
    id: twoSumProblem.id,
    title: twoSumProblem.title,
    category: createReelCategory('HM', twoSumProblem.category),
    statement: twoSumProblem.statement,
    intuition: twoSumProblem.steps,
    answer: twoSumProblem.code,
  },
  {
    uniqueId: 'reel-best-time-to-buy-and-sell-stock',
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    category: createReelCategory('ARR', 'Arrays'),
    statement: 'Choose the best day to buy and the best later day to sell for maximum profit.',
    intuition: [
      'Keep track of the minimum price seen so far as you scan left to right.',
      'At each day, compute the profit if you sold on that day.',
      'Update the best profit whenever the current profit is larger.',
    ],
    answer: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int best = 0;

    for (int price : prices) {
        minPrice = min(minPrice, price);
        best = max(best, price - minPrice);
    }

    return best;
}`,
  },
  {
    uniqueId: 'reel-contains-duplicate',
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    category: createReelCategory('HM', 'Hash Map'),
    statement: 'Return true if any value appears at least twice in the array.',
    intuition: [
      'Scan left to right and remember every number you have already seen.',
      'The moment you meet a number already in the hash set, you can return true.',
      'If the scan finishes without repeats, every value was unique.',
    ],
    answer: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;

    for (int num : nums) {
        if (seen.count(num)) {
            return true;
        }

        seen.insert(num);
    }

    return false;
}`,
  },
  {
    uniqueId: 'reel-valid-anagram',
    id: 'valid-anagram',
    title: 'Valid Anagram',
    category: createReelCategory('HM', 'Hash Map'),
    statement: 'Check whether one string can be formed by rearranging the letters of the other.',
    intuition: [
      'If the lengths differ, they cannot be anagrams.',
      'Count how many times each character appears in the first string.',
      'Walk the second string and subtract counts; any negative count means a mismatch.',
    ],
    answer: `bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;

    unordered_map<char, int> freq;

    for (char ch : s) {
        freq[ch]++;
    }

    for (char ch : t) {
        freq[ch]--;
        if (freq[ch] < 0) {
            return false;
        }
    }

    return true;
}`,
  },
  {
    uniqueId: 'reel-group-anagrams',
    id: 'group-anagrams',
    title: 'Group Anagrams',
    category: createReelCategory('HM', 'Hash Map'),
    statement: 'Group words together when they contain the same letters in a different order.',
    intuition: [
      'Use a normalized representation of each word as the grouping key.',
      'Sorting the characters gives the same key for every anagram in that group.',
      'Store each original word inside the bucket for its sorted key.',
    ],
    answer: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;

    for (string str : strs) {
        string key = str;
        sort(key.begin(), key.end());
        groups[key].push_back(str);
    }

    vector<vector<string>> result;

    for (auto& entry : groups) {
        result.push_back(entry.second);
    }

    return result;
}`,
  },
  {
    uniqueId: 'reel-valid-parentheses',
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: createReelCategory('STK', 'Stack'),
    statement: 'Determine whether the brackets in the string close in the correct order.',
    intuition: [
      'Push every opening bracket onto the stack.',
      'When you see a closing bracket, the top of the stack must be its matching opener.',
      'The string is valid only if the stack is empty at the end.',
    ],
    answer: `bool isValid(string s) {
    stack<char> st;

    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else {
            if (st.empty()) return false;

            char top = st.top();
            st.pop();

            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) {
                return false;
            }
        }
    }

    return st.empty();
}`,
  },
]
