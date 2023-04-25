'use client'

import { FiltersDD } from '@/lib/interfaces'
import { usePathname } from 'next/navigation'
import FilterBar from './FilterBar'
import Hero from './Hero'

const Subheader = (filtersDD: FiltersDD) => {
  const pathname = usePathname()

  return (
    <div className='relative'>
      {pathname == '/' ? <Hero {...filtersDD} /> : <FilterBar {...filtersDD} />}
    </div>
  )
}

export default Subheader
