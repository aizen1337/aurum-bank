'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import TransactionsHistoryChart from '../TransactionHistoryChart/TransactionsHistoryChart';
import React from 'react'
import { redirect } from 'next/navigation';
const Charts = ({expenses, incomes}:{
  expenses: Map<string, number>;
  incomes: Map<string, number>;
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
    if(isDesktop) {
      return <TransactionsHistoryChart expenses={expenses} incomes={incomes}/> 
    }
    redirect("/dashboard")
}

export default Charts