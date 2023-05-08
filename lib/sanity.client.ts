import { Locale } from '@/i18n-config'
import { createClient } from 'next-sanity'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { apiVersion, dataset, projectId, useCdn } from './env'
import { FiltersDD, FrontPage, Propiedad } from './interfaces'
import {
  PROPIEDAD_FIELDS,
  bathroomsDD,
  bedroomsDD,
  frontPageQuery,
  localizacionDD,
  maxPriceRentDD,
  maxPriceSaleDD,
  operacionDD,
  pageBySlugQuery,
  pageSlugsQuery,
  propiedadBySlugQuery,
  propiedadSlugsQuery,
  tipoDD,
  total,
} from './sanity.queries'

export const client = createClient({ apiVersion, dataset, projectId, useCdn })

export async function getFrontPage(lang: Locale): Promise<FrontPage> {
  if (client) {
    return (await client.fetch(frontPageQuery, { lang })) || ({} as any)
  }

  return {} as any
}

export async function getFiltersDropdownValues(
  lang: Locale
): Promise<FiltersDD> {
  if (client) {
    const bathroomsData = client.fetch(bathroomsDD)
    const bedroomsData = client.fetch(bedroomsDD)
    const priceRentData = client.fetch(maxPriceRentDD)
    const priceSaleData = client.fetch(maxPriceSaleDD)
    const localizacionData = client.fetch(localizacionDD)
    const tipoData = client.fetch(tipoDD, { lang })
    const operacionData = client.fetch(operacionDD, { lang })
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
      /* operacionDD: formatOperacionDD(operacionValues), */
    }
  }

  return {} as any
}

export function getSearchProperties(
  /* searchParams: { [key: string]: string | string[] | undefined }, */
  searchParams: ReadonlyURLSearchParams,
  lang: Locale
): Propiedad[] {
  if (client) {
    let query = `*[_type == 'propiedad'`
    for (const [key, value] of searchParams.entries()) {
      if (key == 'precioMin') {
        query += ` && price >= ${Number(value)} `
      } else if (key == 'precioMax') {
        query += ` && price <= ${Number(value)} `
      } else if (key == 'banos') {
        query += ` && bathrooms == ${value} `
      } else if (key == 'habitaciones') {
        query += ` && bedrooms == ${value} `
      } else {
        query += ` && ${key}._ref == '${value}' `
      }
    }
    query += `]{
        ${PROPIEDAD_FIELDS}
        "coverImage": images[0],
        _createdAt,
    } | order(_createdAt desc)[0...50]`

    return client.fetch(query, { lang })
  }

  return {} as any
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<Propiedad, 'slug'>[]
> {
  if (client) {
    const slugs: string[] = await client.fetch(propiedadSlugsQuery)
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
      (await client.fetch(propiedadBySlugQuery, { slug, lang })) || ({} as any)
    )
  }

  return {} as any
}

export async function getAllPagesSlug() {
  if (client) {
    const slugs: string[] = await client.fetch(pageSlugsQuery)
    console.log(slugs)
    return slugs?.map((slug) => ({ slug }))
  }
}
export async function getPageBySlug(slug: string, lang: Locale) {
  if (client) {
    return (await client.fetch(pageBySlugQuery, { slug, lang })) || ({} as any)
  }

  return {} as any
}
