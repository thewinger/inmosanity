import { isUniqueAcrossAllDocuments } from 'lib/sanity.isUniqueAcrossAllDocuments'
import { HiHome } from 'react-icons/hi2'
import { RuleType } from './schemaTypes'

const propiedad = {
  name: 'propiedad',
  title: 'Propiedad',
  type: 'document',
  icon: HiHome,
  initialValue: () => ({
    featured: false,
  }),
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            //Remove spaces
            .replace(/\s+/g, '-')
            //Remove special characters
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'images',
      title: 'Galería de imagenes',
      type: 'array',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'operacion',
      title: 'Operacion',
      type: 'string',
      options: {
        list: [
          { title: 'En venta', value: 'en-venta' },
          { title: 'En alquiler', value: 'en-alquiler' },
          { title: 'Obra nueva', value: 'obra-nueva' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'tipo',
      title: 'Tipo de propiedad',
      type: 'reference',
      to: [{ type: 'tipo' }],
    },
    {
      name: 'localizacion',
      title: 'Localización',
      type: 'reference',
      to: [{ type: 'localizacion' }],
      options: { filter: 'defined(parent)' },
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule: RuleType) => Rule.required().precision(2),
    },
    {
      name: 'size',
      title: 'Tamaño (m2)',
      type: 'number',
    },
    {
      name: 'year',
      title: 'Año de construcción',
      type: 'number',
    },
    {
      name: 'bedrooms',
      title: 'Dormitorios',
      type: 'number',
    },
    {
      name: 'bathrooms',
      title: 'Baños',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'caracteristicas',
      title: 'Características',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caracteristicas' }] }],
      options: { layout: 'tags' },
    },
  ],
  // Customise the preview so parents are visualised in the studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'tipo.title',
      media: 'images.0.asset',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `${subtitle}` : ``,
      media,
    }),
  },
}

export default propiedad
