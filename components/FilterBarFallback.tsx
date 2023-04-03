'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'

export default function FilterBarFallback() {
  const filtersDD = ['en-alquiler', 'en-venta', 'obra-nueva']

  return (
    <div className="relative">
      <div className="inset-0 w-full bg-white px-4 py-2 shadow-sm shadow-zinc-200 data-[state=open]:relative data-[state=open]:z-50  md:px-6">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="shrink-0 grow  self-stretch">
              <SelectValue
                placeholder="Tipo de Operacion"
                className="text-left"
              />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]"
            >
              {filtersDD.map((item) => (
                <SelectItem key={item} value={item}>
                  {item.replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button className="relative flex h-10 shrink grow-0 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-white to-zinc-50 px-3 py-2 text-sm text-zinc-700 shadow-sm outline-none ring-1 ring-zinc-200  transition hover:ring-zinc-300 ">
            <span>Filtros</span>
            <TuneIcon className="h-4 w-4" />
          </button>

          <button className="flex gap-1 rounded-md bg-gradient-to-b from-green-600 to-emerald-700 p-2 text-white">
            <SearchIcon className="h-6 w-6" />
            <span className="sr-only hidden md:inline">Buscar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
