import { Accounts } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
type AccountBadgeProps = {
    account: Accounts
}
const AccountBadge = ({account}: AccountBadgeProps) => {
  return (
    <Link href={`/dashboard/accounts/${account.account_id}`}>
    <div key={account.account_id} className="w-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 rounded-lg">
    <div>
      <div>
         <h6 className="text-xl">{account.account_name}</h6>
      </div>
      <h1 className="font-extrabold text-2xl text-[hsl(36,67%,38%)] break-keep">{account.balance.toString()} {account.defaultCurrency}</h1>                    
    </div>
  </div>
  </Link>
  )
}

export default AccountBadge