import usePageTrack from 'hooks/usePageTrack'

const PublicNav = ({ children }) => {
  usePageTrack()

  console.log('loading')

  return children
}

export default PublicNav
