import { i18n } from '@/i18n-config'
import { getAllPropiedadesSlug } from '@/lib/sanity.client'
import { MetadataRoute } from 'next'

const URL = 'https://inmogolfbonalba.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPropiedadesSlug()
  const locales = i18n.locales

  const propiedades = locales!.flatMap((locale) => {
    return slugs!.map((slug) => {
      return {
        url: `${URL}/${locale}/propiedad/${slug}`,
        lastModified: new Date().toISOString(),
      }
    })
  })

  const routes = ['', '/aviso-legal']

  const staticRoutes = locales!.flatMap((locale) => {
    return routes!.map((route) => {
      return {
        url: `${URL}/${locale}/${route}`,
        lastModified: new Date().toISOString(),
      }
    })
  })

  return [...staticRoutes, ...propiedades]
}
