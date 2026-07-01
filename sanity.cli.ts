/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { getSanityDataset, getSanityProjectId } from './lib/sanity.env'

const projectId = getSanityProjectId()
const dataset = getSanityDataset()

export default defineCliConfig({ api: { projectId, dataset } })
