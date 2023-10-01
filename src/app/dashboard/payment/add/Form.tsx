'use client'
import ContactList from '@/components/ContactList/ContactList'
import  finalizeTransaction  from './finalizeTransaction'
import Select from '@/components/Select/Select'
import { Accounts, Transactions } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { User } from '@clerk/backend'
import { TransactionWithUserID } from '@/components/List/List'
import useExchange from '@/hooks/useExchange'
export type Receiver = {
  id: string,
  full_name: string
}
export type Receivers = Map<string, Array<Receiver>>
type Props = {
    accounts: Accounts[],
    recentReceivers: Receivers,
    currentUser: User
}
const Form = ({accounts,recentReceivers, currentUser}: Props) => {
   const [transaction,setTransaction] = useState<Partial<TransactionWithUserID>>({
    source_account_id: accounts[0].account_id,
    destination_account_id: '',
    currency: accounts[0].defaultCurrency,
    transactionTitle: 'Money Transfer',
    source_account: {
      account_holder: currentUser.id
    }
   })
    const {equal, error, loading, message} = useExchange(transaction.source_account_id, transaction.destination_account_id)
    return (
    <>
    <form className='flex flex-col p-5 h-96 justify-evenly text-black' onSubmit={async () => finalizeTransaction(transaction as TransactionWithUserID)}>
        <h1 className='text-center text-white text-4xl my-10 '>Make a transfer</h1>
        <ContactList contacts={recentReceivers} currentContact={transaction.destination_account_id} setNumber={setTransaction}/>
        <input type='text' className="p-5 rounded-lg m-1 w-full hover:outline-4 hover:ring-2 hover:ring-amber-600 duration-500" placeholder='Transfer title' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionTitle: e.target.value}))}} defaultValue={transaction.transactionTitle} />
        <input type='number' className="p-5 rounded-lg m-1 w-full hover:outline-4 hover:ring-2 hover:ring-amber-600 duration-500" placeholder='Transfer amount' pattern="[0-9]*" min={1} step={.01} aria-controls='none' onChange={(e) => { setTransaction(prevState => ({...prevState, transactionAmount: Number(parseFloat(e.target.value).toFixed(2))}))}} defaultValue={String(transaction.transactionAmount)}/>
        <Select accounts={accounts} setter={setTransaction} selected={transaction.source_account_id}/>
        {loading && <p className='text-amber-600'>Checking currencies...</p>}
        {error && <p className='text-red-600'>Error while checking currencies - {error.message}</p>}
        {message && <p className='text-yellow-600'>{message}</p>}
        {!equal && <p className='text-orange-700'>Warning! Account&apos;s default currency you are trying execute transaction to is different then yours. Aurum Bank will execute exchange.</p>}
        <button type="submit" disabled={loading || !!error || !!message || !transaction.transactionAmount || !transaction.destination_account_id} className="mt-5 mx-3 bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent duration-700 disabled:bg-slate-800 disabled:border-slate-400 disabled:text-slate-600 disabled:cursor-not-allowed rounded">
            Send transaction
        </button>
    </form>
    </>
  )
}

export default Form