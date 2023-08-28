import React from 'react'
type Props = {
    children?: React.ReactNode
}

const BottomNavigation = ({children}: Props) => {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg bg-white border border-gray-200 rounded-full bottom-[10rem] left-1/2 dark:bg-gray-700 dark:border-gray-600 overflow-x-hidden overflow-y-hidden mx-2">
    <div className="grid h-full w-full grid-cols-5 mx-auto">
        {children}
    </div>
</div>
  )
}

export default BottomNavigation