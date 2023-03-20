/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { schemas } from 'lib/sanity_schemas'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { apiVersion, dataset, projectId } from './lib/env'
import { defaultDocumentNode, structure } from './lib/sanity.structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  //edit schemas in './sanity/schema'
  schema: {
    types: schemas,
  },
  plugins: [
    deskTool({ defaultDocumentNode, structure }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
