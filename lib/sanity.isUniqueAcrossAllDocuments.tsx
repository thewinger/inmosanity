// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root
export async function isUniqueAcrossAllDocuments(slug: string, context: any) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2023-01-01' })
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
  const result = await client.fetch(query, params)
  return result
}
