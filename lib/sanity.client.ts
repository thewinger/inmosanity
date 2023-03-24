import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from './env'
import { IFiltersDD, IFrontPage, IPropiedad } from './interfaces'
import {
  filtersDropdownValues,
  frontPageQuery,
  propiedadBySlugQuery,
  propiedadSlugsQuery,
} from './sanity.queries'

export const client = projectId
  ? createClient({ apiVersion, dataset, projectId, useCdn })
  : null

export async function getFrontPage(): Promise<IFrontPage> {
  if (client) {
    return await client.fetch(frontPageQuery)
  }
  return
}

export async function getFiltersDropdownValues(): Promise<IFiltersDD> {
  if (client) {
    return await client.fetch(filtersDropdownValues)
  }
  return
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<IPropiedad, 'slug'>[]
> {
  if (client) {
    const slugs = (await client.fetch<string[]>(propiedadSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPropiedadBySlug(slug: string): Promise<IPropiedad> {
  if (client) {
    return (await client.fetch(propiedadBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}
