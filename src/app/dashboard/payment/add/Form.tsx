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
export type Receivers = Map<string, Array<Receiver>>
type Props = {
    accounts: Accounts[],
    recentReceivers: Receivers
}
const Form = ({accounts,recentReceivers}: Props) => {
   const [originAccount,setOriginAccount] = useState<Accounts>(accounts[0])
   const [transaction,setTransaction] = useState<Partial<Transactions>>({
    source_account_id: originAccount.account_id,
    destination_account_id: '',
    currency: originAccount.defaultCurrency
   })
  return (
    <form className='flex flex-col p-5 h-96 justify-evenly text-black' onSubmit={async () => finalizeTransaction(transaction as Transactions , originAccount)}>
        <ContactList contacts={recentReceivers} currentContact={transaction.destination_account_id} setNumber={setTransaction}/>
        <input type='text' className="p-5 rounded-lg m-1 w-full" placeholder='Transfer title' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionTitle: e.target.value}))}}/>
        <input type='number' className="p-5 rounded-lg m-1 w-full" placeholder='Transfer amount' pattern="[0-9]*" min={1} aria-controls='none' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionAmount: Number(e.target.value)}))}}/>
        <Select accounts={accounts} setter={setOriginAccount}/>
        <button type="submit" className="mt-5 mx-3 bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent duration-700 rounded">
            Send transaction
        </button>
    </form>
  )
}

export default Form