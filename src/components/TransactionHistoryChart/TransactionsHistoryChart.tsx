'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getLabels from './getLabels';
import extractValues from './extractValues';
type Props = {
  expenses?: Map<string, number>
  incomes?: Map<string, number>
}
const TransactionsHistoryChart = ({expenses,incomes}: Props) => {
  if(expenses?.size == 0 && incomes?.size == 0) {
    return null;
  }
  const labels = getLabels(expenses!,incomes!)
  const expensesAmount = extractValues(expenses!)
  const incomesAmount = extractValues(incomes!)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  return (
    <div className="w-full h-full">
     <Bar 
     data={
      {
        labels: labels,
        datasets: [
          {
            label: 'Expenses',
            data: expensesAmount,
            backgroundColor: '#FF7E00'
          },
          {
            label: 'Incomes',
            data: incomesAmount,
            backgroundColor: '#FFBF00'
          }
        ]
      }
     }/>
      </div>
  )
}

export default TransactionsHistoryChart