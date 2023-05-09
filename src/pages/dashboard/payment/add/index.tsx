import { type NextPage } from 'next'
import React from 'react'
import { DashboardLayout } from '~/layout/DashboardLayout'

const Payment: NextPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form className='flex flex-col'>
          <input type='text' placeholder='Account number or phone number'/>
          <input type='text' placeholder='Transfer receiver'/>
          <input type='text' placeholder='Transfer Amount' pattern="[0-9]*"/>
          <button type='submit'>Accept transaction</button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Payment