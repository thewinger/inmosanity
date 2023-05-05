import { Locale } from '@/i18n-config'
import { createClient } from 'next-sanity'
import { cache } from 'react'
import { apiVersion, dataset, projectId, useCdn } from './env'
import { FiltersDD, FrontPage, Propiedad } from './interfaces'
import {
  bathroomsDD,
  bedroomsDD,
  frontPageQuery,
  localizacionDD,
  maxPriceRentDD,
  maxPriceSaleDD,
  operacionDD,
  pageBySlugQuery,
  propiedadBySlugQuery,
  propiedadSlugsQuery,
  PROPIEDAD_FIELDS,
  tipoDD,
  total,
} from './sanity.queries'

export const client = createClient({ apiVersion, dataset, projectId, useCdn })

const clientFetch = cache(client.fetch.bind(client))

export async function getFrontPage(lang: Locale): Promise<FrontPage> {
  if (client) {
    return (await clientFetch(frontPageQuery, { lang })) || ({} as any)
  }

  return {} as any
}

export async function getFiltersDropdownValues(
  lang: Locale
): Promise<FiltersDD> {
  if (client) {
    const bathroomsData = clientFetch(bathroomsDD)
    const bedroomsData = clientFetch(bedroomsDD)
    const priceRentData = clientFetch(maxPriceRentDD)
    const priceSaleData = clientFetch(maxPriceSaleDD)
    const localizacionData = clientFetch(localizacionDD)
    const tipoData = clientFetch(tipoDD, { lang })
    const operacionData = clientFetch(operacionDD, { lang })
    const totalData = clientFetch(total)

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
      /* operacionDD: formatOperacionDD(operacionValues), */
    }
  }

  return {} as any
}

export async function getSearchProperties(
  searchParams: { [key: string]: string | string[] },
  lang: Locale
): Promise<Propiedad[]> {
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
        ${PROPIEDAD_FIELDS}
        "coverImage": images[0],
        _createdAt,
    } | order(_createdAt desc)[0...50]`

    return await clientFetch(query, { lang })
  }

  return {} as any
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<Propiedad, 'slug'>[]
> {
  if (client) {
    const slugs: string[] = await clientFetch(propiedadSlugsQuery)
    return slugs?.map((slug) => ({ slug }))
  }
  return []
}

export async function getPropiedadBySlug(
  slug: string,
  lang: Locale
): Promise<Propiedad> {
  if (client) {
    return (
      (await clientFetch(propiedadBySlugQuery, { slug, lang })) || ({} as any)
    )
  }

  return {} as any
}

export async function getPageBySlug(slug: string, lang: Locale): Promise<any> {
  if (client) {
    return (await clientFetch(pageBySlugQuery, { slug, lang })) || ({} as any)
  }

  return {} as any
}
