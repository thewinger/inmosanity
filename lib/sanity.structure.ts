import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/desk'
import { HiHomeModern } from 'react-icons/hi2'
import { IFramePreviewView } from './sanity_components/IFramePreviewView'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Propiedades')
        .icon(HiHomeModern)
        .child(
          /* Create a list of all posts */
          S.documentList()
            .title('Propiedades')
            .filter('_type == "propiedad"')
            .params({ type: 'propiedad' })
            .menuItems([...S.documentTypeList('propiedad').getMenuItems()])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['propiedad'].includes(listItem.getId())
      ),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, ctx) => {
  const schemaType = ctx.schema.get(ctx.schemaType)

  // Add preview based on schema tname
  if (schemaType.name === 'propiedad') {
    return S.document().views([
      S.view.form().title('Contenido'),
      S.view.component(IFramePreviewView).title('Preview'),
    ])
  }

  return S.document()
}
