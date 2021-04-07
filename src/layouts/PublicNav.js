import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/usePageTrack'

const PublicNav = ({ children }) => {
  useFetch()
  usePageTrack()

  return children
}

export default PublicNav
