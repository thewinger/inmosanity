import { MdOutlineEmail, MdOutlinePhoneInTalk } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import FilterBar from './FilterBar'
import logo from '/public/Logo_Inmogolf.png'
import { getFiltersDropdownValues } from '@/lib/sanity.client'

const Header = async () => {
  const filters = await getFiltersDropdownValues()
  console.log('header', filters)

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2 md:px-6">
        <Link href={`/`}>
          <h1 className="sr-only">Inmogolf Bonalba</h1>
          <Image src={logo} alt="Inmogolf Bonalba" className="h-12 w-auto" />
        </Link>

        <div className="flex justify-between gap-4 text-green-600">
          <a href="mailto:info@inmogolfbonalba.com">
            <MdOutlineEmail size={32} />
          </a>

          <a href="">
            <MdOutlinePhoneInTalk size={32} />
          </a>
        </div>
      </div>
      <FilterBar {...filters} />
    </header>
  )
}

export default Header
