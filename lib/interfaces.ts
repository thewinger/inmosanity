export interface IFrontPage {
  featured: IFeatured[]
  latest: IPropiedad[]
}

export interface IFeatured {
  title: string
  slug: string
}

export interface IPropiedad {
  _id: string
  coverImage: string
  title: string
  slug: string
  bathrooms: string
  bedrooms: string
  localizacion: string
  tipo: string
  price: string
  operacion: string
}
