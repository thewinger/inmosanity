import { HiOutlineTag } from 'react-icons/hi2'
import { RuleType } from './schemaTypes'

const caracteristicas = {
  name: 'caracteristicas',
  title: 'Características',
  type: 'document',
  icon: HiOutlineTag,
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

export default caracteristicas
