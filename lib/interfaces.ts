import { Image } from 'sanity'

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
  tipo: string
  price: string
  operacion: string
  coverImage: Image
  images?: string[]
  caracteristicas?: string[]
  description?: string
  size?: number
  year?: number
}
