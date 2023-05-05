'use client' // Error components must be Client components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <div className='absolute inset-x-0 z-10 block lg:hidden '>
        {/* <button
          className={` relative flex h-10 w-full items-center justify-center gap-2 bg-white px-3 py-2 text-sm text-primary shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
        >
          <FadersIcon weight='bold' size={16} />
          <span>Filtros</span>
        </button> */}
      </div>
      <div className='mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 lg:flex-row lg:px-6 lg:py-12'>
        <div className='grid place-content-center bg-zinc-50 py-60'>
          <h2>Something went wrong!</h2>
          <button
            className='daleee'
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Probar otra vez
          </button>
        </div>
      </div>
    </>
  )
}
