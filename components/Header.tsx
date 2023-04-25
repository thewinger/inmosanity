import Image from 'next/image'
import Link from 'next/link'
import { EnvelopeSimpleIcon, PhoneIcon } from './ui/icons'

import logo from '/public/Logo_Inmogolf.png'

const Header = () => {
  return (
    <header className='relative z-20 bg-white shadow-sm '>
      <div className='flex items-center justify-between  px-4 py-2 md:px-6'>
        <Link href={`/`}>
          <h1 className='sr-only'>Inmogolf Bonalba</h1>
          <Image
            src={logo}
            alt='Inmogolf Bonalba'
            priority
            className='h-12 w-auto'
          />
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
    </header>
  )
}

export default Header
