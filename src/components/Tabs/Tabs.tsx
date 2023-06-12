"use client"
import React, { useState } from 'react'
import Tab from './Tab'
export type TabsHeaderOption = {
    title: string
    content: React.ReactNode
}
type Props = {
    tabs: TabsHeaderOption[]
}

const Tabs = ({tabs}: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <div className='block w-full'>
        <header className='flex justify-between p-3'>
            {tabs.map((tab, index) => (
                <div key={index} onClick={() => setSelectedTab(index)} className={`${selectedTab == index && 'text-amber-600 bg-zinc-900'} cursor-pointer hover:text-amber-600 transition-all duration-500 p-3  rounded-xl`}>
                    <h1>{tab.title}</h1>
                </div>
            ))}
        </header>
        <main>
            {tabs.map((tab, index) => (
                <Tab key={index} index={index} selectedTab={selectedTab}>
                    {tab.content}
                </Tab>
            ))}
        </main>
    </div>
  )
}

export default Tabs