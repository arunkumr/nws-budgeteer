export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export interface CategoryData {
  id: string;
  title: string;
  expenses: Expense[];
  limit?: number;
}