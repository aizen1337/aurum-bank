import { type Transactions } from '@prisma/client'
import React from 'react'

type Props = {
    data?: Transactions[],
}
const List = (props: Props) => {
  return (
    props.data 
    ?
    <ul>
    {
    props.data.map((transaction) => 
    (
        <li key={transaction.id}>
            <p>{transaction.transactionAmount} <small>{transaction.currency.replaceAll('"'," ")}</small></p>
        </li>
    ))
    }
    </ul>
    :
    <h1>No transactions</h1>
  )
}

export default List