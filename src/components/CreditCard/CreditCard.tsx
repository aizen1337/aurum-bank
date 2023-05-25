import { Cards } from '@prisma/client'
import React from 'react'
import switchCardBackground from '@/app/utils/switch'
type Props = {
    card: Cards
}
const CreditCard = ({card}: Props) => {
  return (
    <div key={card.card_number} className={`w-full shadow-inner hover:shadow-2xl hover:bg-zinc-900 cursor-pointer p-3 mt-3 rounded-lg ${switchCardBackground(card.card_type)}`}>
        <div className="md:flex justify-between items-center w-full">
        <p>{card.card_holder}</p>
        <small>{card.card_type}</small>
        </div>
  </div>
  )
}

export default CreditCard