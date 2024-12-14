import React from 'react';
import './BudgetInput.css';

interface BudgetInputProps {
  totalBudget: number;
  onBudgetChange: (value: number) => void;
}

export const BudgetInput: React.FC<BudgetInputProps> = ({ totalBudget, onBudgetChange }) => {
  return (
    <div className="budget-input">
      <h2>Set Your Monthly Budget</h2>
      <div className="budget-input__field">
        <span className="currency">$</span>
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          placeholder="Enter your total budget"
          min="0"
        />
      </div>
    </div>
  );
};