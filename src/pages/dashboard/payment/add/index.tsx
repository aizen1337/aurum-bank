import { type NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import { DashboardLayout } from '~/layout/DashboardLayout'
import { api } from '~/utils/api'
const Payment: NextPage = () => {
  const {data: accounts, isLoading: accountsLoading} = api.accounts.getAccounts.useQuery()
  const [transactionAmount,setTransactionAmount] = useState<number | undefined>(accounts ? accounts[0]?.balance : 0)
  return (
    <DashboardLayout>
      <main className='md:w-6/12 w-screen h-screen flex flex-col justify-evenly'>
        <form className='flex flex-col p-5 h-96 justify-evenly'>
          <input type='text' className="p-5 rounded-lg" placeholder='Account number or phone number'/>
          <input type='text' className="p-5 rounded-lg" placeholder='Transfer receiver'/>
          <input type='number' className="p-5 rounded-lg" placeholder='Transfer amount' pattern="[0-9]*" min={1} max={transactionAmount} aria-controls='none'/>
          {
          accountsLoading 
          ?
          <p>Loading account data...</p>
          :
          <select className="p-5 rounded-lg" onChange={(e) => setTransactionAmount(Number(e.target.value))}>
            {
              accounts?.map((account) => (
                <option key={account.account_id} className='flex flex-col' value={account.balance}>
                  <div className='flex flex-col'>
                  <h1>{account.account_name} ({account.balance} {account.defaultCurrency})</h1>
                  </div>
                </option>
              ))
            }
          </select>
          }
            <button type="button" className="relative inline-flex items-center justify-center p-1.5 m-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-amber-200 via-amber-700 to-yellow-400">
                  Send transaction
            </button>
        </form>
        </main>
    </DashboardLayout>
  )
}

export default Payment