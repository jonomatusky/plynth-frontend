import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'

const PublicNav = ({ children }) => {
  useFetch()
  usePageTrack()

  return children
}

export default PublicNav
