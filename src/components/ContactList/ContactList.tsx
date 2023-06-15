import React, { useState } from 'react'
import ExpandIcon from '../Select/ExpandIcon'
import { Receiver } from '@/app/dashboard/payment/add/Form'
import { Transactions } from '@prisma/client'
type Props = {
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    setNumber: React.Dispatch<React.SetStateAction<Partial<Transactions>>>
    currentContact: string | undefined
    contacts: Receiver[]
}
const ContactList = ({setNumber, contacts, currentContact}: Props) => {
    const [expanded,setExpanded] = useState(false);
    
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
        {contacts.map((contact) => (
            <div key={contact.id} 
            className={`mt-3 p-5 cursor-pointer ${currentContact === contact.id ? 'border-2 border-amber-900 rounded-lg text-amber-900' : ''} `} 
            onClick={() => {
                setNumber(prevState => ({...prevState, destination_account_id: contact.id }))
                setExpanded(false)
                }
            }>
                <h1>{contact.full_name}</h1>
                <small>{contact.id}</small>
            </div>
        ))} 
        </main> 
    }
    </section>
  )
}
export default ContactList