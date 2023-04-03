import caracteristicas from './sanity_schemas/caracteristicas'
import localizacion from './sanity_schemas/localizacion'
import propiedad from './sanity_schemas/propiedad'
import tipoPropiedad from './sanity_schemas/tipo-propiedad'
import { SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propiedad, localizacion, tipoPropiedad, caracteristicas],
}
