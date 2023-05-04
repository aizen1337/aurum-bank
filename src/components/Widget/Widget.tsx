import React from 'react'

type Props = {
    children?: React.ReactElement
    title: string
}

const Widget = (props: Props) => {
  return (
    <section className="w-full h-full bg-zinc-800 rounded-2xl p-5 relative">
        <h1 className="font-bold text-white md:text-xl hover:text-[hsl(36,67%,38%)]">{props.title}</h1>
        {props.children}
    </section>
  )
}

export default Widget