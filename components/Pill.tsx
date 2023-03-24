import React, { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Pill({ children }: IProps) {
  return (
    <div className="absolute top-4 left-4 z-10 rounded-md border border-white bg-white/90 py-1 px-2 text-xs font-semibold uppercase text-zinc-900 shadow-sm">
      {children}
    </div>
  )
}
