import { HiOutlineDocumentText } from 'react-icons/hi2'
import { isUniqueAcrossAllDocuments } from '../sanity.isUniqueAcrossAllDocuments'
import { RuleType } from './schemaTypes'

const paginas = {
  name: 'paginas',
  title: 'Paginas',
  type: 'document',
  icon: HiOutlineDocumentText,
  fields: [
    {
      name: 'title',
      title: 'Nombre',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Español',
          type: 'string',
          validation: (Rule: RuleType) => Rule.required(),
        },
        {
          name: 'en',
          title: 'Inglés',
          type: 'string',
          validation: (Rule: RuleType) => Rule.required(),
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.es',
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
      name: 'content',
      title: 'Contenido',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Español',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'en',
          title: 'Inglés',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
  // Customise the preview so parents are visualised in the studio
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'title.en',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle,
    }),
  },
}

export default paginas
