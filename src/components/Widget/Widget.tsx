import React from 'react'

type Props = {
    children?: React.ReactNode
    title: string
}

const Widget = (props: Props) => {
  return (
    <section className="w-full md:w-[40vw] md:max-h-[40vh] max-h-screen max-w-screen bg-zinc-800 rounded-2xl md:p-8 sm:p-8 p-3 relative overflow-y-auto	overflow-x-hidden">
        <h1 className="font-bold text-white md:text-xl hover:text-[hsl(36,67%,38%)] cursor-pointer">{props.title}</h1>
        <div>
        {props.children}
        </div>
    </section>
  )
}

export default Widget