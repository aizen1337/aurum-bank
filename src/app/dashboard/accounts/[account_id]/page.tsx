import database from '@/utils/prisma'
import React from 'react'

type Props = {
  params: {
    account_id: string
  }
}

const AccountDetails = async ({params}: Props) => {
  const account = await database.accounts.findUnique({
    where: {
      account_id: params.account_id
    }
  })
  return (
    <div>{JSON.stringify(account)}</div>
  )
}

export default AccountDetails