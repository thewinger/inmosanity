'use client'

import { IFiltersDD } from '@/lib/interfaces'
import { usePathname } from 'next/navigation'
import FilterBar from './FilterBar'
import Hero from './Hero'

const Subheader = ({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
  total,
}: IFiltersDD) => {
  const filtersDD = {
    priceRentDD,
    priceSaleDD,
    bathroomsDD,
    bedroomsDD,
    localizacionDD,
    operacionDD,
    tipoDD,
    total,
  }

  const pathname = usePathname()

  return (
    <div className='relative'>
      {pathname == '/' ? <Hero {...filtersDD} /> : <FilterBar {...filtersDD} />}
    </div>
  )
}

export default Subheader
