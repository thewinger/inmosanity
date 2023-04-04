//Change these to material-icons
import FilterBar from './FilterBar'
import FilterBarFallback from './FilterBarFallback'
import logo from '/public/Logo_Inmogolf.png'
import { getFiltersDropdownValues } from '@/lib/sanity.client'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { MdOutlineEmail, MdOutlinePhoneInTalk } from 'react-icons/md'

export default async function Header() {
  const filters = await getFiltersDropdownValues()

  return (
    <header className='absolute inset-x-0 top-0 z-50 grid grid-flow-row auto-rows-auto divide-y divide-zinc-100 bg-white'>
      <div className='flex items-center justify-between  px-4 py-2 md:px-6'>
        <Link href={`/`}>
          <h1 className='sr-only'>Inmogolf Bonalba</h1>
          <Image src={logo} alt='Inmogolf Bonalba' className='h-12 w-auto' />
        </Link>

        <div className='flex justify-between gap-4 text-green-600'>
          <a href='mailto:info@inmogolfbonalba.com'>
            <MdOutlineEmail size={32} />
          </a>

          <a href=''>
            <MdOutlinePhoneInTalk size={32} />
          </a>
        </div>
      </div>
      <Suspense fallback={<FilterBarFallback />}>
        <FilterBar {...filters} />
      </Suspense>
    </header>
  )
}
