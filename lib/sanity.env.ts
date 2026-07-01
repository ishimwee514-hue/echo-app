const VALID_SANITY_ID = /^[a-z0-9-]+$/

function readSanityValue(key: string, fallback: string) {
  const value = process.env[key]?.trim()
  if (!value) {
    return fallback
  }

  return VALID_SANITY_ID.test(value) ? value : fallback
}

export function getSanityProjectId() {
  return readSanityValue('NEXT_PUBLIC_SANITY_PROJECT_ID', 'demo-project')
}

export function getSanityDataset() {
  return readSanityValue('NEXT_PUBLIC_SANITY_DATASET', 'production')
}

export function getSanityApiVersion() {
  return process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2023-05-03'
}
