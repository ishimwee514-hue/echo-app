import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { getSanityDataset, getSanityProjectId } from './lib/sanity.env'

const projectId = getSanityProjectId()
const dataset = getSanityDataset()

export default defineConfig({
  name: 'echo-app',
  title: 'Echo App',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})