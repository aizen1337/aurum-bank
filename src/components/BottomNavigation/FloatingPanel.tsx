'use client'
import React from 'react'
import BottomNavigation from './BottomNavigation'
import BottomNavigationItem from './BottomNavigationItem'
import Briefcase from './Icons/Briefcase'
import Person from './Icons/Person'
import Plus from './Icons/Plus'
import Stocks from './Icons/Stocks'
import { useRouter } from 'next/navigation'
const FloatingPanel = () => {
  const router = useRouter()
  return (
    <BottomNavigation>
       <BottomNavigationItem title='Business' icon={<Briefcase/>}/>
       <BottomNavigationItem title='Personal accounts' icon={<Person/>}/>
       <BottomNavigationItem title='Open account' icon={<Plus/>} action={() => router.push('/dashboard/payment/add')} main />
       <BottomNavigationItem title='Investments' icon={<Stocks/>}/>
       <BottomNavigationItem title='Loans' icon={<Person/>}/>
    </BottomNavigation>
  )
}

export default FloatingPanel