import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { RuleType } from './schemaTypes'

const tipo = {
  name: 'tipo',
  title: 'Tipo de Propiedad',
  type: 'document',
  icon: HiOutlineBuildingOffice,
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
}

export default tipo
