import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const TransactionChart = (receivedTransactionsAmount: number, sendTransactions: number) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <Doughnut 
    data={{
      labels: ['Expenses','Incomes'],
      datasets: [
        {
          data: [receivedTransactionsAmount, sendTransactions],
          backgroundColor: ['rgb(39 39 42)','hsl(36,67%,38%)']
        },
      ],
    }}/>
  )
}

export default TransactionChart