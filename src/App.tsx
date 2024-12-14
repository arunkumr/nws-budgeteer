import React, { useState } from 'react';
import { Container } from './components';
import { BudgetInput } from './components/BudgetInput/BudgetInput';
import { BudgetCategory } from './components/BudgetCategory/BudgetCategory';
import { BudgetChart } from './components/BudgetChart/BudgetChart';
import { CategoryData, Expense } from './types';
import { generateId } from './utils/helpers';
import './App.css';

const App: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryData[]>([
    { id: '1', title: 'Needs', expenses: [], limit: undefined },
    { id: '2', title: 'Wants', expenses: [], limit: undefined },
    { id: '3', title: 'Savings', expenses: [], limit: undefined }
  ]);

  const handleAddExpense = (categoryId: string) => {
    const newExpense: Expense = {
      id: generateId(),
      name: '',
      amount: 0,
    };

    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, expenses: [...cat.expenses, newExpense] }
        : cat
    ));
  };

  const handleUpdateExpense = (
    categoryId: string,
    expenseId: string,
    updates: Partial<Expense>
  ) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            expenses: cat.expenses.map(exp => 
              exp.id === expenseId ? { ...exp, ...updates } : exp
            )
          }
        : cat
    ));
  };

  const handleDeleteExpense = (categoryId: string, expenseId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            expenses: cat.expenses.filter(exp => exp.id !== expenseId)
          }
        : cat
    ));
  };

  const handleSetLimit = (categoryId: string, limit: number) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, limit } : cat
    ));
  };

  return (
    <Container>
      <h1 className="app-title">Budget Planner</h1>
      
      <BudgetInput
        totalBudget={totalBudget}
        onBudgetChange={setTotalBudget}
      />

      <div className="budget-layout">
        <div className="budget-categories">
          {categories.map(category => (
            <BudgetCategory
              key={category.id}
              title={category.title}
              expenses={category.expenses}
              limit={category.limit}
              onAddExpense={() => handleAddExpense(category.id)}
              onUpdateExpense={(expenseId, updates) => 
                handleUpdateExpense(category.id, expenseId, updates)
              }
              onDeleteExpense={(expenseId) => 
                handleDeleteExpense(category.id, expenseId)
              }
              onSetLimit={(limit) => handleSetLimit(category.id, limit)}
            />
          ))}
        </div>
        
        <BudgetChart categories={categories} />
      </div>
    </Container>
  );
};

export default App;