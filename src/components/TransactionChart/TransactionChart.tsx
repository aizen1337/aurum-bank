'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
type ChartData = {
  transactions: (number | null)[][]
}
const TransactionChart = ({transactions}: ChartData ) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <div className="w-[15rem] md:w-[30rem]">
        <Doughnut 
          data={{
          labels: ['Expenses','Incomes'],
          datasets: [
            {
              data: transactions,
              backgroundColor: ['rgb(39 39 42)','hsl(36,67%,38%)']
            },
          ],
        }}/>
    </div>
  )
}

export default TransactionChart