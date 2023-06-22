import { Accounts, Transactions } from '@prisma/client'
import ExpandIcon from './ExpandIcon'
import React, { useState } from 'react'
import SelectItem from './SelectItem'
type SelectProps = {
    accounts: Accounts[]
    setter: React.Dispatch<React.SetStateAction<Partial<Transactions>>>
    selected?: string
}
const Select = ({accounts,setter}: SelectProps) => {
  const [selectedAccount, setSelectedAccount] = useState<Accounts | null>(accounts[0])
  const [expanded, setExpanded] = useState(false)
  return (
    <section className='p-5 bg-white text-black rounded-lg m-1 w-full'>
        <header className='flex cursor-pointer gap-4' onClick={() => setExpanded(!expanded)}>
        Choose an account 
        {selectedAccount && <h1 className='text-amber-900'>{selectedAccount.account_name} ({selectedAccount.balance} {selectedAccount.defaultCurrency})</h1>} 
        <ExpandIcon/>
        </header>
    {
    expanded && 
    accounts?.map((account) => (
      <SelectItem account={account}
        key={account.account_id}
        onClick={() => 
        { 
        setSelectedAccount(account)
        setter(prevState => ({...prevState, source_account_id: account.account_id}))
        setExpanded(false)
        }}
        selected={selectedAccount}
        />
    ))
    }
    </section>
  )
}

export default Select