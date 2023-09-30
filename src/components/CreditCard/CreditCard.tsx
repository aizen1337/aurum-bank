'use client'
import { Cards } from '@prisma/client'
import React from 'react'
import switchCardBackground from '@/utils/switch'
import Link from 'next/link'
import Image from 'next/image'
type Props = {
    card: Cards
}
const CreditCard = ({card}: Props) => {
  return (
    <Link href={`/dashboard/cards/${card.card_number}`}>
          <div className="w-full xl:w-8/12 aspect-video m-auto bg-red-100 flex flex-col rounded-xl relative text-sm text-white shadow-2xl transition-transform transform hover:scale-110 my-10">
            
            <Image className="relative object-cover w-full h-full rounded-xl" fill src={switchCardBackground(card.card_type)} alt='credit card'/>
            
            <div className="w-full px-8 relative top-8">
                <div className="flex">
                    <div className="">
                        <p className="font-medium tracking-widest">
                            {card.card_holder}
                        </p>
                    </div>
                    {/* <Image className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" width={14} height={14} alt='credit card'/> */}
                </div>
                <div className="pt-1">
                    <p className="font-light">
                        Card Number
                    </p>
                    <p className="font-medium tracking-more-wider">
                        {card.card_number}
                    </p>
                </div>
                <div className="mt-8 xs:mt-24 sm:mt-40">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light text-xs">
                                Type
                            </p>
                            <p className="font-medium tracking-wider text-sm">
                                {card.card_type}
                            </p>
                        </div>
                        <div className="">
                            <p className="font-light text-xs">
                                Expiry
                            </p>
                            <p className="font-medium tracking-wider text-sm">
                                {card.card_expiration_date.toLocaleString('en-US', {
                                  year: '2-digit',
                                  month: '2-digit'
                                })}
                            </p>
                        </div>

                        <div className="">
                            <p className="font-light text-xs">
                                CVV
                            </p>
                            <p className="font-bold tracking-more-wider text-sm">
                                {card.card_cvv}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </Link>
  )
}

export default CreditCard