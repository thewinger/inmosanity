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
  return await client.fetch(frontPageQuery)
}

export async function getFiltersDropdownValues(): Promise<IFiltersDD> {
  return await client.fetch(filtersDropdownValues)
}

export async function getAllPropiedadesSlug(): Promise<
  Pick<IPropiedad, 'slug'>[]
> {
  const slugs: string[] = await client.fetch(propiedadSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function getPropiedadBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<IPropiedad> {
  return await client.fetch(propiedadBySlugQuery, { slug })
}
