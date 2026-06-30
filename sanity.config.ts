import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// 1. Make sure this import is at the top with the others:
import {schemaTypes} from './sanity/schemas' 

export default defineConfig({
  name: 'default',
  title: 'ECHO Studio', // (or whatever you named it)
  projectId: 'wx5g5ozw', // (This should be your actual Project ID)
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  // 2. Make sure it looks exactly like this down here:
  schemas: {
    types: schemaTypes, // <-- Notice the 's' at the end of 'types'!
  },
})