import { type NextPage } from 'next'
import React from 'react'
const Payment: NextPage = () => {
  return (
      <main className='md:w-6/12 w-screen h-screen flex flex-col justify-evenly'>
        <form className='flex flex-col p-5 h-96 justify-evenly'>
          <input type='text' className="p-5 rounded-lg" placeholder='Account number or phone number'/>
          <input type='text' className="p-5 rounded-lg" placeholder='Transfer receiver'/>
          <input type='number' className="p-5 rounded-lg" placeholder='Transfer amount' pattern="[0-9]*" min={1} aria-controls='none'/>
            <button type="button" className="relative inline-flex items-center justify-center p-1.5 m-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-amber-200 via-amber-700 to-yellow-400">
                  Send transaction
            </button>
        </form>
        </main>
  )
}

export default Payment