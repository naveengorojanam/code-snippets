import { twoSumProblem } from '../code-blocks/array/twosum'
import type { StudyReelProblem } from '../components/study-reel-card/StudyReelCard'

const createReelCategory = (short: string, label: string): StudyReelProblem['category'] => ({
  short,
  label,
})

export const studyReelProblems: StudyReelProblem[] = [
  {
    uniqueId: 'reel-two-sum',
    id: twoSumProblem.id,
    title: twoSumProblem.title,
    category: createReelCategory('HM', twoSumProblem.category),
    intuition:
      'Store seen values in a map. For each number, check whether target minus current value was already seen.',
    answer: twoSumProblem.code,
  },
  {
    uniqueId: 'reel-best-time-to-buy-and-sell-stock',
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    category: createReelCategory('ARR', 'Arrays'),
    intuition: 'Track the minimum price so far and update the best profit at each step.',
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
    uniqueId: 'reel-valid-parentheses',
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: createReelCategory('STK', 'Stack'),
    intuition:
      'Push opening brackets. On a closing bracket, the stack top must be the matching opener.',
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
