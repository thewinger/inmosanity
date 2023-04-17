// ./src/desk-structure/parentChild.js

import { HiOutlineMap } from 'react-icons/hi2'
import { map } from 'rxjs/operators'

export default function parentChild(schemaType, S, context) {
  const documentStore = context.documentStore
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id, title }`
  const options = { apiVersion: `2023-01-01` }

  return S.listItem()
    .title('Localizaciones')
    .icon(HiOutlineMap)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('Localizaciones')
            .items([
              // Create a List Item for all documents
              // Useful for searching
              S.listItem()
                .title('Todas')
                .schemaType(schemaType)
                .child(() =>
                  S.documentTypeList(schemaType)
                    /* .schemaType(schemaType) */
                    .title('Todas')
                    /* .filter('_type == "${schemaType}"') */
                    // Use this list for displaying from search results
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' && params.type === 'localizacion'
                    )
                    .child((id) =>
                      S.document().documentId(id).schemaType(schemaType)
                    )
                ),
              S.divider(),
              // Create a List Item for Parents
              // To display all documents that do not have parents
              S.listItem()
                .title('Ciudades')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Ciudades')
                    .filter(filter)
                    // Use this list for creating from parents menu
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'create' &&
                        params.template === 'localizacion'
                    )
                    .child((id) =>
                      S.document().documentId(id).schemaType(schemaType)
                    )
                ),
              S.divider(),
              // Create a List Item for each parent
              // To display all its child documents
              ...parents.map((parent) =>
                S.listItem({
                  id: parent._id,
                  title: parent.title,
                  schemaType,
                  child: () =>
                    S.documentTypeList(schemaType)
                      .title('Children')
                      .filter(
                        `_type == $schemaType && parent._ref == $parentId`
                      )
                      .params({ schemaType, parentId: parent._id })
                      // Use this list for creating from child menu
                      .canHandleIntent(
                        (intentName, params) =>
                          intentName === 'create' &&
                          params.template === 'localizacion-child'
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem('localizacion-child', {
                          parentId: parent._id,
                        }),
                      ]),
                })
              ),
            ])
        )
      )
    )
}
