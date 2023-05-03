import { FadersIcon } from '@/components/ui/icons'
import { ChaoticOrbit } from '@uiball/loaders'

export default function LoadingPropiedades() {
  return (
    <>
      <div className='absolute inset-x-0 z-10 block lg:hidden '>
        <button
          className={` relative flex h-10 w-full items-center justify-center gap-2 bg-white px-3 py-2 text-sm text-primary shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
        >
          <FadersIcon weight='bold' size={16} />
          <span>Filtros</span>
        </button>
      </div>
      <div className=' mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 lg:flex-row lg:px-6 lg:py-12'>
        <div className='relative isolate hidden w-[18.5rem] flex-col lg:flex'>
          <div className='grid place-content-center bg-zinc-50 py-60'>
            LOADING!!!!!
            <ChaoticOrbit size={48} speed={5} color='#16a34a' />
          </div>
        </div>
      </div>
    </>
  )
}
