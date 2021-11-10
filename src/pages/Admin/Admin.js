import React from 'react'
import useUserStore from 'hooks/store/use-user-store'

const { Redirect } = require('react-router')

const Admin = () => {
  const { user } = useUserStore()

  if (user.id) {
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
    return <></>
  }
}

export default Admin
