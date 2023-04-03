import { apiVersion, dataset, projectId, useCdn } from './env'
import { IFiltersDD, IFrontPage, IPropiedad } from './interfaces'
import {
  filtersDropdownValues,
  frontPageQuery,
  propiedadBySlugQuery,
  propiedadSlugsQuery,
} from './sanity.queries'
import { createClient } from 'next-sanity'

export const client = projectId
  ? createClient({ apiVersion, dataset, projectId, useCdn })
  : null

export async function getFrontPage(): Promise<IFrontPage | undefined> {
  if (client) {
    return await client?.fetch(frontPageQuery)
  }

  return
}

export async function getFiltersDropdownValues(): Promise<
  IFiltersDD | undefined
> {
  return await client?.fetch(filtersDropdownValues)
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
}): Promise<IPropiedad | undefined> {
  if (client) {
    return await client.fetch(propiedadBySlugQuery, { slug })
  }

  return
}
