import { Image } from 'sanity'

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface IFrontPage {
  featured: IFeatured[]
  latest: IPropiedad[]
}

export interface IFeatured {
  title: string
  slug: string
  coverImage: Image
  tipo: string
  operacion: string
}

export interface IPropiedad {
  _id: string
  title: string
  slug: string
  bathrooms: string
  bedrooms: string
  localizacion: string
  localizacionPadre?: Parent
  tipo: string
  price: string
  operacion: string
  coverImage: Image
  images?: Image[]
  caracteristicas?: string[]
  description?: string
  size?: number
  year?: number
}

interface Parent {
  parent: parentTitle
}

interface parentTitle {
  title: string
}

interface IFilter {
  min: number
  max: number
}

interface IFilterOption {
  name: string
  value: string
}

interface IParentLocalizacion extends IFilterOption {
  childLocalizacion?: IFilterOption[]
}
interface IFilterLocalizacion {
  parentLocalizacion: IParentLocalizacion[]
}

export interface IFiltersDD {
  priceRentDD: IFilter
  priceSaleDD: IFilter
  bedroomsDD: number
  bathroomsDD: number
  operacionDD: string[]
  localizacionDD: IFilterLocalizacion[]
  tipoDD: IFilterOption[]
}
