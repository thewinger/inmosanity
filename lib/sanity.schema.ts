import { SchemaTypeDefinition } from 'sanity'

import caracteristicas from './sanity_schemas/caracteristicas'
import imagen from './sanity_schemas/imagen'
import localizacion from './sanity_schemas/localizacion'
import propiedad from './sanity_schemas/propiedad'
import tipoPropiedad from './sanity_schemas/tipo-propiedad'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propiedad, imagen, localizacion, tipoPropiedad, caracteristicas],
}
