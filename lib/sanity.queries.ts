import { groq } from 'next-sanity'

const PROPIEDAD_FIELDS = `
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
    ${PROPIEDAD_FIELDS}
    "coverImage": images[0],
  },
}`

export const searchPropiedades = groq`
*[_type == 'propiedad' && operacion == $operacion  && tipo._ref == $tipo && localizacion._ref == $localizacion && bathrooms == $bathrooms && bedrooms == $bedrooms && price >= $priceMin && price <= $priceMax]{
  ${PROPIEDAD_FIELDS}
  "coverImage": images[0],
}
`

export const propiedadSlugsQuery = groq`
  *[_type == "propiedad" && defined(slug.current)][].slug.current
`

export const propiedadBySlugQuery = groq`
  *[_type == "propiedad" && slug.current == $slug][0] {
    ${PROPIEDAD_FIELDS}
    "caracteristicas": caracteristicas[]->title,
    "images": images[],
    description,
  }
`

export const operacionDD = groq`
  array::unique(*[_type == "propiedad" ].operacion)
`

export const tipoDD = groq`
  array::unique(*[_type =="tipo"  && count(*[ _type == 'propiedad' && references(^._id)]) > 0]{
    "name": title,
    "value":_id
  })
`
export const localizacionDDBak = groq`
  *[_type == 'localizacion' && !(defined(parent))]{
      title,
      "count": count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)]),
      "children": *[ _type == 'localizacion' && references(^._id) && count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)]) > 0]{
        title,
        "count": count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)])
      } | order(title asc),
  }[ count > 0 || count(children) > 0] | order(title asc)
`

export const localizacionDD = groq`
*[_type == 'localizacion' && !(defined(parent))]{
    title,
    _id,
    "count": count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)]),
    "children": *[ _type == 'localizacion' && references(^._id) && count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)]) > 0]{
      title,
      _id,
      "count": count(*[_type == 'propiedad' && !(_id in path('drafts.**')) && references(^._id)])
    } | order(title asc),

}[ count > 0 || count(children) > 0]{
  "name": title,
  "value": _id,
  count(children) > 0 => {
      children[]{
        "name": title,
        "value": _id,
      }
        },

} | order(title asc)
`

export const maxPriceSaleDD = groq`
  math::max(*[_type == 'propiedad' && operacion != 'en-alquiler'].price)
`

export const maxPriceRentDD = groq`
  math::max(*[_type == 'propiedad' && operacion == 'en-alquiler'].price)
`

export const bathroomsDD = groq`
  math::max(*[_type == 'propiedad'].bathrooms)
`

export const bedroomsDD = groq`
  math::max(*[_type == 'propiedad'].bedrooms)
`

export const total = groq`
  count(*[_type == 'propiedad'])
`
