import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://inmogolfbonalba.com',
      lastModified: new Date(),
    },
    {
      url: 'https://inmogolfbonalba.com/aviso-legal',
      lastModified: new Date(),
    },
    {
      url: 'https://inmogolfbonalba.com/blog',
      lastModified: new Date(),
    },
  ]
}
