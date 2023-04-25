import { HiHomeModern } from 'react-icons/hi2'
import parentChild from './parentChild'
import { IFramePreviewView } from './sanity_components/IFramePreviewView'

export const structure = (S, context) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem().title('Todas las propiedades').icon(HiHomeModern).child(
        /* Create a list of all posts */
        S.documentTypeList('propiedad').title('Todas las propiedades')
      ),
      S.listItem()
        .title('Propiedades publicadas')
        .icon(HiHomeModern)
        .child(
          /* Create a list of all posts */

          /* documentStore
            .listenQuery(`count(*[_type == '<type>'])`)
            .pipe(
              map(count =>
                S.documentTypeList('<type>').title(`Total documents: ${count}`)
              )
            )             */
          S.documentList()
            .title('Propiedades publicadas')
            .filter('_type == "propiedad" && !(_id in path("drafts.**"))')
            .canHandleIntent(
              (intentName, params) =>
                intentName === 'create' && params.id === 'localizacion'
            )
            .menuItemGroups(S.documentTypeList('propiedad').getMenuItemGroups())
            .menuItems(S.documentTypeList('propiedad').getMenuItems())
        ),
      S.divider(),
      parentChild('localizacion', S, context),
      /* S.listItem()
        .title('Localizaciones')
        .icon(HiOutlineMap)
        .child(
          S.documentList()
            .title('Ciudades')
            .filter('_type == "localizacion" && !defined(parent)')
            .child((localizacionId) =>
              S.documentTypeList('localizacion')
                .title('Zonas')
                .filter(
                  '_type == "localizacion" && $localizacionId == parent._ref'
                )
                .params({ localizacionId })
                .canHandleIntent(
                  (intentName, params) =>
                    intentName === 'create' &&
                    params.template === 'localizacion-child'
                )
                .initialValueTemplates([
                  S.initialValueTemplateItem('localizacion-child', {
                    parentId: parent._id,
                  }),
                ])
            )
        ), */
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['propiedad', 'localizacion'].includes(listItem.getId())
      ),
    ])

export const defaultDocumentNode = (S, ctx) => {
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
