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

export async function getFrontPage(): Promise<IFrontPage> {
  if (client) {
    return (await client?.fetch(frontPageQuery)) || ({} as any)
  }

  return {} as any
}

export async function getFiltersDropdownValues(): Promise<IFiltersDD> {
  if (client) {
    return (await client?.fetch(filtersDropdownValues)) || ({} as any)
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
