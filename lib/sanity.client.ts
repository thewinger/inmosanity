import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'
import { formatOperacionDD } from './helpers'
import { FiltersDD, FrontPage, Propiedad } from './interfaces'
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

export const client = projectId
  ? createClient({ apiVersion, dataset, projectId, useCdn })
  : null

export async function getFrontPage(): Promise<FrontPage> {
  if (client) {
    return (await client?.fetch(frontPageQuery)) || ({} as any)
  }

  return {} as any
}

export async function getFiltersDropdownValues(): Promise<FiltersDD> {
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
      operacionDD: formatOperacionDD(operacionValues),
      total: totalValues,
    }
  }

  return {} as any
}

export async function getSearchProperties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}): Promise<Propiedad[]> {
  if (client) {
    let query = `*[_type == 'propiedad'`
    for (const [key, value] of Object.entries(searchParams)) {
      if (key == 'precioMin') {
        query += ` && price >= ${Number(value)} `
      } else if (key == 'precioMax') {
        query += ` && price <= ${Number(value)} `
      } else if (key == 'tipo' || key == 'localizacion') {
        query += ` && ${key}._ref == '${value}' `
      } else if (key == 'banos') {
        query += ` && bathrooms == ${value} `
      } else if (key == 'habitaciones') {
        query += ` && bedrooms == ${value} `
      } else {
        query += ` && ${key} == '${value}' `
      }
    }
    query += `]{
        _id,
        title,
        _createdAt,
        "slug": slug.current,
        bathrooms,
        bedrooms,
        operacion,
        "localizacion": localizacion->title,
        "localizacionPadre": localizacion->{parent->{title}},
        "tipo": tipo->title,
        price,
        size,
        year,
        "coverImage": images[0],
    } | order(_createdAt desc)[0...10]`

    console.log('query', query)

    return await client.fetch(query)
  }

  return {} as any
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<Propiedad, 'slug'>[]
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
}): Promise<Propiedad> {
  if (client) {
    return (await client.fetch(propiedadBySlugQuery, { slug })) || ({} as any)
  }

  return {} as any
}
