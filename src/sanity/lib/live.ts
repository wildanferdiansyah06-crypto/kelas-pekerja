// Live content features disabled due to next-sanity version incompatibility
// This file can be re-enabled when upgrading to Next.js 16+
import { client } from './client'

export const sanityFetch = client.fetch.bind(client)
export const SanityLive = () => null
