'use client'

import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { ArrowLeftIcon } from './icons'

interface BackButtonProps {
  children: React.ReactNode
}

const BackButton: FC<BackButtonProps> = ({ children }) => {
  const router = useRouter()
  return (
    <button
      type='button'
      onClick={() => router.back()}
      className='flex h-10 grow items-center justify-center gap-1 rounded-md px-4  font-medium text-green-600  hover:bg-green-100 sm:inline-flex '
    >
      <ArrowLeftIcon size={16} weight='bold' color='currentColor' />
      {children}
    </button>
  )
}
export default BackButton
