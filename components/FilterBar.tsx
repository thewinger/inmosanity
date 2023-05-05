'use client'

import { FiltersDD } from '@/lib/interfaces'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Filters from './ui/filters'
import { FadersIcon } from './ui/icons'

type FilterBarProps = {
  filtersDD: FiltersDD
  searchParams: { [key: string]: string | string[] }
}

const FilterBar = ({ filtersDD, searchParams }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='absolute inset-x-0 z-10 block lg:hidden '>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className={` relative flex h-10 w-full items-center justify-center gap-2 bg-white px-3 py-2 text-sm text-primary shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
          >
            <FadersIcon weight='bold' size={16} />
            <span>Filtros</span>
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
          </DialogHeader>
          <Filters
            filtersDD={filtersDD}
            searchParams={searchParams}
            dict={dict.filters}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FilterBar
