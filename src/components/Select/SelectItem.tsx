import React from 'react'
import { Accounts } from '@prisma/client'
type Props = {
    account: Accounts
    selected: Accounts | null
    onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

const SelectItem = ({account, onClick, selected}: Props) => {
  return (
    <section key={account.account_id} className={`mt-3 p-5 cursor-pointer ${account === selected ? 'border-2 border-amber-900 rounded-lg text-amber-900' : ''} `} onClick={onClick}>
        <h1>{account.account_name}</h1>
        <small>{account.balance.toExponential(2)} {account.defaultCurrency}</small>
    </section>
  )
}

export default SelectItem