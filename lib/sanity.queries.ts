import { groq } from 'next-sanity'

const propiedadFields = groq`
  _id,
  title,
  "slug": slug.current,
  bathrooms,
  bedrooms,
  operacion,
  "localizacion": localizacion->title,
  "localizacionPadre": localizacion->{parent->{title}},
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
  "latest": *[_type == "propiedad"] | order(_createdAt desc) [0...12] {
    ${propiedadFields}
    "coverImage": images[0],
  },
}`

export const propiedadSlugsQuery = groq`
  *[_type == "propiedad" && defined(slug.current)][].slug.current
`

export const propiedadBySlugQuery = groq`
  *[_type == "propiedad" && slug.current == $slug][0] {
    ${propiedadFields}
    "caracteristicas": caracteristicas[]->title,
    "images": images[],
    description,
  }
`

export const formInitialValues = groq`
{
  "transacciones": array::unique(*[_type == "propiedad" ].operacion),
  "localizacion": {
    "parentLocalizacion": *[_type == 'localizacion' && !defined(parent) && count(*[ _type == 'propiedad' && references(^._id)]) > 0]{
      _id,
      title,
      "childLocalizacion": *[_type == 'localizacion' && references(^._id) && count(*[ _type == 'propiedad' && references(^._id)]) > 0]{
        _id,
        title
      }
    } | order(title asc)
  },
  "maxPrice": math::max(*[_type == 'propiedad'].price),
  "bathrooms": math::max(*[_type == 'propiedad'].bathrooms),
  "bedrooms": math::max(*[_type == 'propiedad'].bedrooms),
}`
