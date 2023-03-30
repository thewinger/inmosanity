import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import { IFiltersDD } from '@/lib/interfaces'

export default function FilterForm({
  bathroomsDD,
  bedroomsDD,
  priceRentDD,
  priceSaleDD,
  localizacionDD,
  operacionDD,
  tipoDD,
}: IFiltersDD) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="tipo">Tipo de propiedad</Label>
      <Select name="tipo" defaultValue="Todas">
        <SelectTrigger className="self-stretch">
          <SelectValue placeholder="Tipo de Propiedad" className="text-left" />
        </SelectTrigger>
        <SelectContent>
          {filtersDD.tipoDD?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
