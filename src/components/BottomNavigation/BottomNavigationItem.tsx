import React from 'react'
import Tooltip from './Tooltip'

type Props = {
    icon?: React.ReactElement
    title: string
    main?: boolean
}

const BottomNavigationItem = ({icon, title, main}: Props) => {
  return (
    <Tooltip uniqueId={title} title={title}>
    {main ? 
    <section className='flex justify-center items-center'>
    <button data-tooltip-target={title} type="button" className={'inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 overflow-hidden'}>
        {icon}
        <span className="sr-only">{title}</span>
    </button>
    </section>
    :
    <button data-tooltip-target={title} type="button" className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group overflow-hidden`}>
        {icon}
    <span className="sr-only">{title}</span>
    </button>
    }
    </Tooltip>
  )
}

export default BottomNavigationItem