import React from 'react'
import Widget from '~/components/Widget/Widget'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { api } from "~/utils/api";
const TransactionsChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);  
  const {data: received, isLoading: requestPending} = api.transactionsRouter.receivedTransactions.useQuery()
  const {data: spent, isLoading} = api.transactionsRouter.sentTransactions.useQuery()
  return (
    <Widget title="Cashflow">
    {
        isLoading || requestPending
        ? 
        <p>Loading...</p>
        :
        <Doughnut 
        data={{
          labels: ['Expenses','Incomes'],
          datasets: [
            {
              data: [received?._sum.transactionAmount, spent?._sum.transactionAmount],
              backgroundColor: ['rgb(39 39 42)','hsl(36,67%,38%)']
            },
          ],
        }}/>
    }
    </Widget>
  )
}

export default TransactionsChart