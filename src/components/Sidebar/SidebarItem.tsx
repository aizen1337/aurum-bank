import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { type ReactElement } from 'react'
type Props = {
    icon: ReactElement,
    title: string,
    destination: string
}
const SidebarItem = (props: Props) => {
  const {pathname} = useRouter()
  const isPath = [props.destination].includes(pathname)
  return (
        <Link href={props.destination} className='w-full h-full flex md:flex-row flex-col items-center justify-center text-center'>
          <div className={`w-full h-full flex md:flex-row flex-col items-center gap-4 justify-center ${isPath ? 'text-[hsl(36,67%,38%)]' : 'text-white'} hover:bg-neutral-900 hover:text-[hsl(36,67%,38%)] ${isPath ? 'bg-neutral-900' : 'bg-zinc-800'} cursor-pointer duration-50`}>
              <article className="font-bold md:flex hidden">{props.title}</article>
                {props.icon}
              <small className={`md:hidden flex font-bold ${isPath ? 'text-[hsl(36,67%,38%)]' : 'text-white'}`}>
                {props.title}
              </small>
          </div>
        </Link>
  )
}

export default SidebarItem