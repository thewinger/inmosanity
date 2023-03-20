import { groq } from 'next-sanity'

const propiedadFields = groq`
  _id,
  "coverImage": images[0].asset->url,
  title,
  "slug": slug.current,
  bathrooms,
  bedrooms,
  "localizacion": localizacion->title,
  "tipo": tipo->title,
  price,
  operacion,
`

export const frontPageQuery = groq`
{
  "featured": *[_type == "propiedad" && featured] | order(_createdAt desc) [0...6] {
    title,
    "slug": slug.current,
    "coverImage": images[0].asset->url,
  },
  "latest": *[_type == "propiedad"] | order(_createdAt desc) [0...9] {
    ${propiedadFields}
  },
}`
