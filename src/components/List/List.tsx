import { useUser } from '@clerk/nextjs'
import { type Transactions } from '@prisma/client'
import React from 'react'

type Props = {
    data?: Transactions[],
}
const List = (props: Props) => {
  const {user} = useUser()
  return (
    props.data && props.data.length > 0
    ?
    <ul>
    {
    props.data.map((transaction) => 
    (
        <li key={transaction.id} className={`${transaction.senderId == user?.id ? 'text-red-500' : 'text-lime-600'} flex md:gap-4 gap-1`}>
            <span>{transaction.senderId == user?.id ? 'Spent' : "Received"}</span>
            <p>{transaction.transactionAmount} <small>{transaction.currency.replaceAll('"'," ")}</small></p>
            {transaction.senderId == user?.id 
            ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
            </svg>
            }
        </li>
    ))
    }
    </ul>
    :
    <h1>No transactions</h1>
  )
}

export default List