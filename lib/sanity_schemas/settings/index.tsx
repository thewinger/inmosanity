import { HiCog } from 'react-icons/hi2'

import { RuleType } from '../schemaTypes'
import OpenGraphInput from './OpenGraphInput'

const settings = {
  name: 'ajustes',
  title: 'Ajustes',
  type: 'document',
  icon: HiCog,
  preview: { select: { title: 'titulo', subtitulo: 'description' } },
  fields: [
    {
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [
        {
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule: RuleType) => rule.required(),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'ogImage',
      title: 'Imagen Open Graph',
      description:
        'Usada para redes sociales cuando se comparte la dirección de la web',
      type: 'object',
      components: {
        input: OpenGraphInput as any,
      },
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
      ],
    },
  ],
}

export default settings
