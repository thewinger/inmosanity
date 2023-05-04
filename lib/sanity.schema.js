import caracteristicas from './sanity_schemas/caracteristicas'
import localizacion from './sanity_schemas/localizacion'
import operacion from './sanity_schemas/operacion'
import propiedad from './sanity_schemas/propiedad'
import tipoPropiedad from './sanity_schemas/tipo-propiedad'

export const schema = {
  types: [propiedad, localizacion, tipoPropiedad, caracteristicas, operacion],
  // Add this 'localizacion child' template
  templates: (prev) => {
    const localizacionChild = {
      id: 'localizacion-child',
      title: 'localizacion: Child',
      schemaType: 'localizacion',
      parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
      // This value will be passed-in from desk structure
      value: ({ parentId }) => ({
        parent: { _type: 'reference', _ref: parentId },
      }),
    }

    return [...prev, localizacionChild]
  },
}
