import React, { useState } from 'react'
import ExpandIcon from '../Select/ExpandIcon'
import { Receiver, Receivers } from '@/app/dashboard/payment/add/Form'
import { Transactions } from '@prisma/client'
type Props = {
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    setNumber: React.Dispatch<React.SetStateAction<Partial<Transactions>>>
    currentContact: string | undefined
    contacts: Receivers
}
const ContactList = ({setNumber, contacts, currentContact}: Props) => {
    const [expanded,setExpanded] = useState(false);
    const contactList = []
    for(const [contact, numbers] of Array.from(contacts)) {
        contactList.push(
            <div key={contact} className='p-5'>
                <h1 className= 'my-8 font-bold'>{contact}</h1>
                <div className='flex flex-col'>
                {numbers.map((number) => 
                <small
                className={`mx-5 p-5 cursor-pointer ${currentContact === number.id ? 'border-2 border-amber-900 rounded-lg text-amber-900' : ''} `}
                key={number.id} 
                onClick={() => {
                    setNumber(prevState => ({...prevState, destination_account_id: number.id}))
                    setExpanded(false)
                    }}
                >
                    {number.id}
                </small>)
                }
                </div>
            </div>
        )
    }
  return (
        <section className=' bg-white text-black rounded-lg m-1 w-full'>
            <header className='flex cursor-pointer gap-4'>
                <input type='text' className="p-5 w-full text-black rounded-lg" 
                placeholder="Expand list via icon on the right or enter number manually" 
                value={currentContact} 
                onChange={(e) => setNumber(prevState => ({...prevState, destination_account_id: e.target.value }))}/>
                <i onClick={() => setExpanded(!expanded)} className='p-5'>
                    <ExpandIcon />
                </i>
            </header>
        {expanded &&
        <main className='p-5'>
        <h1>Recent contacts</h1>
        {contactList} 
        </main> 
    }
    </section>
  )
}
export default ContactList