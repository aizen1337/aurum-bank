import { Accounts } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
type AccountBadgeProps = {
    account: Accounts
}
const AccountBadge = ({account}: AccountBadgeProps) => {
  return (
    <Link href={`/dashboard/accounts/${account.account_id}`} className='h-full w-full p-5 hover:bg-zinc-900 rounded-lg duration-500'>
      <div key={account.account_id} className="w-full flex justify-between  cursor-pointer rounded-lg">
        <div>
          <h6 className="text-xl">{account.account_name}</h6>
          <h6 className='text-md font-thin'>{account.account_id}</h6>
        </div>
          <h1 className="font-extrabold text-2xl text-[hsl(36,67%,38%)] break-keep">{Number(account.balance).toString()} {account.defaultCurrency}</h1>                  
      </div>
    </Link>
  )
}

export default AccountBadge