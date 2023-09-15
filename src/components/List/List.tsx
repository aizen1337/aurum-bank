import { type Transactions } from '@prisma/client'
import React from 'react'
import { User } from '@clerk/nextjs/dist/server'
type TransactionWithUserID = Transactions & {
  source_account: {
    account_holder: string;
  }
}
type Props = {
    user: User
    data?: TransactionWithUserID[]; 
}
const List = ({data, user}: Props) => {
  return (
    data && data.length > 0
    ?
    <ul>
    {
    data.map((transaction) => 
    (   
        <>
        <li key={transaction.id} className={`${transaction.source_account.account_holder  !== user?.id ? 'text-red-500' : 'text-lime-600'} flex md:gap-4 gap-1 m-2`}>
            <span className='sm:block hidden'>{transaction.source_account.account_holder !== user?.id ? 'Spent' : "Received"}</span>
            <p>{Number(transaction.transactionAmount).toString()} <small>{transaction.currency.replaceAll('"'," ")}</small></p>
            {transaction.source_account.account_holder  !== user?.id
            ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
            </svg>
            }
            <small>{transaction.createdAt.toLocaleDateString('pl-PL')}</small>
        </li>
        <hr className='mx-5 border-zinc-700'/>
        </>
    ))
    }
    </ul>
    :
    <h1>No transactions</h1>
  )
}

export default List