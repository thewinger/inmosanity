import { Image } from 'sanity'

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface FrontPage {
  featured: Featured[]
  latest: Propiedad[]
}

export interface Featured {
  title: string
  slug: string
  coverImage: Image
  tipo: string
  operacion: string
}

export interface Propiedad {
  _id: string
  title: string
  slug: string
  bathrooms: string
  bedrooms: string
  localizacion: string
  localizacionPadre?: Parent
  tipo: string
  price: string
  operacion: FilterString
  coverImage: Image
  images?: Image[]
  caracteristicas?: { title: string }[]
  description?: string
  size?: number
  year?: number
}

export interface Page {
  slug: string
}

interface Parent {
  parent: parentTitle
}

interface parentTitle {
  title: string
}

export interface FilterNum {
  min: number
  max: number
}

export interface FilterString {
  name: string
  value: string
}

interface Localizacion extends FilterString {
  name: string
  value: string
}

export interface ParentLocalizacion extends Localizacion {
  children: Localizacion[]
}

export interface FiltersDD {
  priceRentDD: number
  priceSaleDD: number
  bedroomsDD: number
  bathroomsDD: number
  operacionDD: FilterString[]
  localizacionDD: ParentLocalizacion[]
  tipoDD: FilterString[]
  total: number
}
