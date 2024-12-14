import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CategoryData } from '../../types';
import { CATEGORY_COLORS, CHART_OPTIONS } from '../../constants/colors';
import './BudgetChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetChartProps {
  categories: CategoryData[];
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ categories }) => {
  const totalBudget = categories.reduce((sum, cat) => sum + (cat.limit || 0), 0);
  
  // Data for the inner pie chart (category limits)
  const categoryData = {
    labels: [      
      ...categories.flatMap(cat => 
        [...cat.expenses.map(exp => `${cat.title} - ${exp.name}`),`${cat.title} - Buffer`] // Add category-expense combinations
      ),
    ]
    ,
    datasets: [{
      data: categories.flatMap(cat => [...cat.expenses.map(exp => exp.amount),
        (cat.limit || 0) - cat.expenses.reduce((sum, exp) => sum + exp.amount, 0)]),
      backgroundColor: categories.flatMap(cat => 
        [...cat.expenses.map(() => CATEGORY_COLORS[cat.title as keyof typeof CATEGORY_COLORS].secondary),
        CATEGORY_COLORS[cat.title as keyof typeof CATEGORY_COLORS].primary]
      ),
    },{
      data: categories.map(cat => ((cat.limit || 0) / totalBudget) * 100),
      backgroundColor: categories.map(cat => CATEGORY_COLORS[cat.title as keyof typeof CATEGORY_COLORS].primary),
    }]
  };
  debugger;



  return (
    <div className="budget-chart">
      <div className="budget-chart__container">
        <div className="budget-chart__inner">
          <h3>Category Allocation</h3>
          <Pie data={categoryData} options={CHART_OPTIONS} />
        </div>
      </div>
    </div>
  );
};