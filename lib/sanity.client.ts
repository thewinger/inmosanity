import { apiVersion, dataset, projectId, useCdn } from './env'
import {
  IFilterNum,
  IFilterParentLocalizacion,
  IFiltersDD,
  IFilterString,
  IFrontPage,
  IPropiedad,
} from './interfaces'
import {
  bathroomsDD,
  bedroomsDD,
  frontPageQuery,
  localizacionDD,
  maxPriceRentDD,
  maxPriceSaleDD,
  operacionDD,
  propiedadBySlugQuery,
  propiedadSlugsQuery,
  tipoDD,
  total,
} from './sanity.queries'
import { createClient } from 'next-sanity'

export const client = projectId
  ? createClient({ apiVersion, dataset, projectId, useCdn })
  : null

export async function getFrontPage(): Promise<IFrontPage> {
  if (client) {
    return (await client?.fetch(frontPageQuery)) || ({} as any)
  }

  return {} as any
}

export async function getFiltersDropdownValues(): Promise<IFiltersDD> {
  if (client) {
    const bathroomsData = client.fetch(bathroomsDD)
    const bedroomsData = client.fetch(bedroomsDD)
    const priceRentData = client.fetch(maxPriceRentDD)
    const priceSaleData = client.fetch(maxPriceSaleDD)
    const localizacionData = client.fetch(localizacionDD)
    const tipoData = client.fetch(tipoDD)
    const operacionData = client.fetch(operacionDD)
    const totalData = client.fetch(total)

    const [
      bathroomsValues,
      bedroomsValues,
      priceRentValues,
      priceSaleValues,
      localizacionValues,
      tipoValues,
      operacionValues,
      totalValues,
    ] = await Promise.all([
      bathroomsData,
      bedroomsData,
      priceRentData,
      priceSaleData,
      localizacionData,
      tipoData,
      operacionData,
      totalData,
    ])

    return {
      bathroomsDD: bathroomsValues,
      bedroomsDD: bedroomsValues,
      priceRentDD: priceRentValues,
      priceSaleDD: priceSaleValues,
      localizacionDD: localizacionValues,
      tipoDD: tipoValues,
      operacionDD: operacionValues,
      total: totalValues,
    }
  }

  return {} as any
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<IPropiedad, 'slug'>[]
> {
  if (client) {
    const slugs: string[] = await client?.fetch(propiedadSlugsQuery)
    return slugs?.map((slug) => ({ slug }))
  }
  return []
}

export async function getPropiedadBySlug({
  slug,
}: {
  slug: string
}): Promise<IPropiedad> {
  if (client) {
    return (await client.fetch(propiedadBySlugQuery, { slug })) || ({} as any)
  }

  return {} as any
}
