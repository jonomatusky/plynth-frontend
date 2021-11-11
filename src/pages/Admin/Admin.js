import React from 'react'
import useUserStore from 'hooks/store/use-user-store'
import { useFetch } from 'hooks/use-fetch'
import LoadingScreen from 'components/LoadingScreen'

const { Redirect } = require('react-router')

const Admin = () => {
  const { user } = useUserStore()

  useFetch()

  if (user._id) {
    if (
      user.tier === 'free' ||
      user.tier === 'artist' ||
      user.tier === 'agency' ||
      user.tier === 'trial'
    ) {
      return <Redirect push to="/admin/packs" />
    } else {
      return <Redirect push to="/admin/pieces" />
    }
  } else {
    return <LoadingScreen backgroundColor={'theme.palette.background.card'} />
  }
}

export default Admin
