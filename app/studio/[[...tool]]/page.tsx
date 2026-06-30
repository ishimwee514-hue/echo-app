import StudioPage from './StudioPage'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function Page() {
  return <StudioPage />
}