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
