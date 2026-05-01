import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Add API token for authentication
  ignoreBrowserTokenWarning: true, // Suppress browser token warning
})
