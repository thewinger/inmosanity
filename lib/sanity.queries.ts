import { groq } from 'next-sanity'

const propiedadFields = groq`
  _id,
  title,
  "slug": slug.current,
  bathrooms,
  bedrooms,
  operacion,
  "coverImage": images[0],
  "localizacion": localizacion->title,
  "tipo": tipo->title,
  price,
  size,
  year,
`

export const frontPageQuery = groq`
{
  "featured": *[_type == "propiedad" && featured] | order(_createdAt desc) [0...6] {
    title,
    "slug": slug.current,
    "coverImage": images[0],
    "tipo": tipo->title,
    operacion,
  },
  "latest": *[_type == "propiedad"] | order(_createdAt desc) [0...9] {
    ${propiedadFields}
  },
}`

export const propiedadSlugsQuery = groq`
  *[_type == "propiedad" && defined(slug.current)][].slug.current
`

export const propiedadBySlugQuery = groq`
  *[_type == "propiedad" && slug.current == $slug][0] {
    ${propiedadFields}
    "caracteristicas": caracteristicas[]->title,
    "imagesUrl": images[],
  }
`
