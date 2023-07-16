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
type Props = {
  expenses?: number[]
  incomes?: number[]
}
const TransactionsHistoryChart = ({expenses,incomes}: Props) => {
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Expenses',
            data: expenses,
            backgroundColor: 'red'
          },
          {
            label: 'Incomes',
            data: incomes,
            backgroundColor: 'blue'
          }
        ]
      }
     }/>
      </div>
  )
}

export default TransactionsHistoryChart