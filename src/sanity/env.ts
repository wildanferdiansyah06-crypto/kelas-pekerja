export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const projectId = (rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId))
  ? rawProjectId
  : 'frlqeeaf'


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
