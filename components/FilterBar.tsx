import { IFiltersDD } from '@/lib/interfaces'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { FadersIcon, XIcon } from './ui/icons'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface IFilters {
  price?: string
  bedrooms?: number
  bathrooms?: number
  operacion?: string
  localizacion?: string
  tipo?: string
}

const FilterBar = ({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
  total,
}: IFiltersDD) => {
  const [filtersDD, setFiltersDD] = useState<IFiltersDD>({
    priceRentDD,
    priceSaleDD,
    bathroomsDD,
    bedroomsDD,
    localizacionDD,
    operacionDD,
    tipoDD,
    total,
  })

  const [filters, setFilters] = useState<IFilters>({})
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const updateFilters = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const createQueryString = useCallback(
    (filters: IFilters) => {
      const params = new URLSearchParams(searchParams)
      for (const [key, value] of Object.entries(filters)) {
        params.set(key, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleFilters = async () => {
    router.push(`/propiedades?` + createQueryString(filters))
  }

  const contentFrontPage = <div className='bg-green-500 pt-32'></div>

  const contentRest = (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='inset-0 w-full bg-white px-4 py-2 shadow-sm shadow-zinc-200 md:px-6 '
      >
        <CollapsibleTrigger asChild>
          <button
            className={`${
              isOpen
                ? 'bg-gradient-to-b from-zinc-100 to-zinc-50'
                : 'bg-gradient-to-b from-white to-zinc-100'
            } relative flex h-10 w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-800  shadow-sm shadow-black/5 outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 `}
          >
            <span>Filtros</span>
            {isOpen ? <XIcon size={16} /> : <FadersIcon size={16} />}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className=''>
          <div className='my-6 flex flex-col gap-4 '>
            <div className='grid w-full max-w-sm items-center justify-stretch gap-1.5'>
              <Label htmlFor='tipo'>Tipo de propiedad</Label>
              <Select
                name='tipo'
                onValueChange={(value) => updateFilters('tipo', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Seleccione un tipo de propiedad...'
                    className=''
                  />
                </SelectTrigger>
                <SelectContent
                  position='popper'
                  className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
                >
                  {filtersDD.tipoDD?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='grid w-full max-w-sm items-center justify-stretch gap-1.5'>
              <Label htmlFor='tipo'>Localizacion</Label>
              <Select
                name='localizacion'
                onValueChange={(value) => updateFilters('localizacion', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder='Seleccione localizacion...'
                    className=''
                  />
                </SelectTrigger>
                <SelectContent
                  position='popper'
                  className='max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]'
                >
                  {filtersDD.tipoDD?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )

  return (
    <div className='relative'>
      {pathname == '/' ? contentFrontPage : contentRest}
    </div>
  )
}

export default FilterBar
