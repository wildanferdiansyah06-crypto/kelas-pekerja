import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN temporarily to see changes immediately
  token: process.env.SANITY_API_TOKEN, // Add API token for authentication
})
