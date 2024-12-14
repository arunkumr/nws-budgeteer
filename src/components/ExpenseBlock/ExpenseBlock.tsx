import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Expense } from '../../types';
import './ExpenseBlock.css';

interface ExpenseBlockProps {
  expense: Expense;
  onUpdate: (updates: Partial<Expense>) => void;
  onDelete: () => void;
}

export const ExpenseBlock: React.FC<ExpenseBlockProps> = ({
  expense,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);

  const handleSave = () => {
    onUpdate({ name, amount });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="expense-block expense-block--editing">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Expense name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          min="0"
        />
        <div className="expense-block__actions">
          <Button variant="primary" size="small" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-block">
      <div className="expense-block__info">
        <span className="expense-block__name">{expense.name}</span>
        <span className="expense-block__amount">
          ${expense.amount.toFixed(2)}
        </span>
      </div>
      <div className="expense-block__actions">
        <Button
          variant="secondary"
          size="small"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
        <Button variant="outline" size="small" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
