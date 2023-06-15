import React from 'react'

type Props = {
  children?: React.ReactNode,
  index: number,
  selectedTab: number
}

const Tab = ({children, index, selectedTab}: Props) => {
  return (
    <div className={index == selectedTab ? 'block' : 'hidden'}>
      {children}
    </div>
  )
}

export default Tab