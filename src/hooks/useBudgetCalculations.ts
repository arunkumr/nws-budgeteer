import { useMemo } from 'react';
import { CategoryData } from '../types';

export const useBudgetCalculations = (categories: CategoryData[]) => {
  return useMemo(() => {
    const totalBudget = categories.reduce((sum, cat) => sum + (cat.limit || 0), 0);
    const totalExpenses = categories.reduce(
      (sum, cat) => sum + cat.expenses.reduce((expSum, exp) => expSum + exp.amount, 0),
      0
    );

    const categoryTotals = categories.map(cat => ({
      id: cat.id,
      title: cat.title,
      total: cat.expenses.reduce((sum, exp) => sum + exp.amount, 0),
      limit: cat.limit || 0,
      percentage: cat.limit ? (cat.expenses.reduce((sum, exp) => sum + exp.amount, 0) / cat.limit) * 100 : 0,
    }));

    return {
      totalBudget,
      totalExpenses,
      categoryTotals,
      remainingBudget: totalBudget - totalExpenses,
    };
  }, [categories]);
};