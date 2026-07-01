import { createClient } from 'next-sanity'
import { getSanityApiVersion, getSanityDataset, getSanityProjectId } from './sanity.env'

const projectId = getSanityProjectId()
const dataset = getSanityDataset()
const apiVersion = getSanityApiVersion()

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})