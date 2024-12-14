import React from 'react';
import { Button } from '../Button/Button';
import { ExpenseBlock } from '../ExpenseBlock/ExpenseBlock';
import { CategoryData, Expense } from '../../types';
import './BudgetCategory.css';

interface BudgetCategoryProps {
  title: string;
  expenses: Expense[];
  limit?: number;
  onAddExpense: () => void;
  onUpdateExpense: (id: string, expense: Partial<Expense>) => void;
  onDeleteExpense: (id: string) => void;
  onSetLimit: (limit: number) => void;
}

export const BudgetCategory: React.FC<BudgetCategoryProps> = ({
  title,
  expenses,
  limit,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onSetLimit,
}) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const progress = limit ? (totalExpenses / limit) * 100 : 0;

  return (
    <div className="budget-category">
      <div className="budget-category__header">
        <h3>{title}</h3>
        {limit && (
          <p className="budget-category__allocation">
            ${totalExpenses.toFixed(2)} / ${limit.toFixed(2)}
          </p>
        )}
      </div>

      {limit && (
        <div className="budget-category__progress">
          <div
            className="budget-category__progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
          <span>{progress.toFixed(1)}%</span>
        </div>
      )}

      <div className="budget-category__expenses">
        {expenses.map((expense) => (
          <ExpenseBlock
            key={expense.id}
            expense={expense}
            onUpdate={(updates) => onUpdateExpense(expense.id, updates)}
            onDelete={() => onDeleteExpense(expense.id)}
          />
        ))}
      </div>

      <div className="budget-category__actions">
        <Button variant="outline" onClick={onAddExpense}>
          Add Expense
        </Button>
        <input
          type="number"
          placeholder="Set Category Limit"
          value={limit || ''}
          onChange={(e) => onSetLimit(Number(e.target.value))}
          className="budget-category__limit-input"
        />
      </div>
    </div>
  );
};