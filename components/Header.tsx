import { getFiltersDropdownValues } from '@/lib/sanity.client'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Subheader from './Subheader'
import SubheaderFallback from './SubheaderFallback'
import { EnvelopeSimpleIcon, PhoneIcon } from './ui/icons'

import logo from '/public/Logo_Inmogolf.png'

const Header = async () => {
  const filtersDD = await getFiltersDropdownValues()

  return (
    <header className='z-50 grid grid-flow-row auto-rows-auto divide-y divide-zinc-100'>
      <div className='flex items-center justify-between  px-4 py-2 md:px-6'>
        <Link href={`/`}>
          <h1 className='sr-only'>Inmogolf Bonalba</h1>
          <Image src={logo} alt='Inmogolf Bonalba' className='h-12 w-auto' />
        </Link>

        <div className='flex justify-between gap-4 text-green-600'>
          <a href='mailto:info@inmogolfbonalba.com'>
            <EnvelopeSimpleIcon size={32} />
          </a>

          <a href=''>
            <PhoneIcon size={32} />
          </a>
        </div>
      </div>
      <Suspense fallback={<SubheaderFallback />}>
        <Subheader {...filtersDD} />
      </Suspense>
    </header>
  )
}

export default Header
