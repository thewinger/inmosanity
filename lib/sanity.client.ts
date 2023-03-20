import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from './env'
import { IFrontPage } from './interfaces'
import { frontPageQuery } from './sanity.queries'

export const client = projectId
  ? createClient({ apiVersion, dataset, projectId, useCdn })
  : null

export async function getFrontPage(): Promise<IFrontPage> {
  if (client) {
    return await client.fetch(frontPageQuery)
  }
  return
}
