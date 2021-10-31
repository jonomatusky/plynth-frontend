const { useSession } = require('hooks/use-session')
const { Redirect } = require('react-router')

const Admin = () => {
  const { user, initializing } = useSession()

  if (!initializing) {
    if (
      user.tier === 'free' ||
      (user.tier === 'artist') | (user.tier === 'agency')
    ) {
      return <Redirect push to="/admin/packs" />
    } else {
      return <Redirect push to="/admin/pieces" />
    }
  } else {
    return <></>
  }
}

export default Admin
