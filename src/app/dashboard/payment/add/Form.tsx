'use client'
import ContactList from '@/components/ContactList/ContactList'
import  finalizeTransaction  from './finalizeTransaction'
import Select from '@/components/Select/Select'
import { Accounts, Transactions } from '@prisma/client'
import React, { useState } from 'react'
export type Receiver = {
  id: string,
  full_name: string
}
type Props = {
    accounts: Accounts[],
    recentReceivers: Receiver[]
}
const Form = ({accounts,recentReceivers}: Props) => {
   const [originAccount,setOriginAccount] = useState<Accounts>(accounts[0])
   const [transaction,setTransaction] = useState<Partial<Transactions>>({
    source_account_id: originAccount.account_id,
    destination_account_id: '',
    currency: originAccount.defaultCurrency
   })
  return (
    <form className='flex flex-col p-5 h-96 justify-evenly text-black' onSubmit={async () => finalizeTransaction(transaction as Transactions ,originAccount)}>
        <ContactList contacts={recentReceivers} currentContact={transaction.destination_account_id} setNumber={setTransaction}/>
        <input type='text' className="p-5 rounded-lg m-1 w-full" placeholder='Transfer title' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionTitle: e.target.value}))}}/>
        <input type='number' className="p-5 rounded-lg m-1 w-full" placeholder='Transfer amount' pattern="[0-9]*" min={1} aria-controls='none' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionAmount: Number(e.target.value)}))}}/>
        <Select accounts={accounts} setter={setOriginAccount}/>
        <button type="submit" className="relative inline-flex items-center justify-center p-4 m-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-amber-200 via-amber-700 to-yellow-400">
            Send transaction
        </button>
    </form>
  )
}

export default Form