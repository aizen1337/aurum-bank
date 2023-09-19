import React from 'react'

type Props = {
    children?: React.ReactNode
    title: string
}

const Widget = (props: Props) => {
  return (
    <section className="w-full h-full lg:w-[42vw] lg:h-[42vh] bg-zinc-800 rounded-2xl md:p-8 sm:p-8 p-10 relative overflow-y-auto overflow-x-hidden">
        <h1 className="font-bold text-[hsl(36,67%,38%)] xl:text-2xl text-lg">{props.title}</h1>
        <div>
        {props.children}
        </div>
    </section>
  )
}

export default Widget