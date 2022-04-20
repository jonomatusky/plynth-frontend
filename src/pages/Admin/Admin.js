import React, { useEffect } from 'react'
import useUserStore from 'hooks/store/use-user-store'
import { useFetch } from 'hooks/use-fetch'
import LoadingScreen from 'components/LoadingScreen'
import usePackStore from 'hooks/store/use-pack-store'

import { Redirect } from 'react-router'

const Admin = () => {
  const { user, status: userStatus } = useUserStore()
  const { packs, status: packStatus, createStatus, createPack } = usePackStore()

  useFetch()

  const isOldUser =
    user.tier === 'free' ||
    user.tier === 'artist' ||
    user.tier === 'agency' ||
    user.tier === 'trial'

  useEffect(() => {
    //create a pack if one does not exist

    const handleCreatePiece = async () => {
      console.log('creating piece')
      try {
        await createPack({
          name: 'My New Experience',
          style: { backgroundColor: '#fafafa', fontColor: '#222222' },
          isPublic: false,
          shareWithLink: true,
          cards: [
            {
              type: 'ar',
            },
          ],
        })
      } catch (err) {}
    }

    if (
      (packStatus === 'succeeded' || packStatus === 'complete') &&
      createStatus !== 'loading' &&
      packs.length === 0
    ) {
      try {
        handleCreatePiece()
      } catch (error) {}
    }
  })

  if (
    userStatus === 'succeeded' &&
    (packStatus === 'succeeded' || packStatus === 'complete')
  ) {
    if (isOldUser) {
      return <Redirect push to="/admin/packs" />
    } else if (packs.length === 1) {
      return <Redirect push to={`/admin/pieces/${packs[0].id}/edit`} />
    } else if (packs.length === 0) {
      return <LoadingScreen backgroundColor={'theme.palette.background.card'} />
    } else {
      return <Redirect push to="/admin/pieces" />
    }
  } else {
    return <LoadingScreen backgroundColor={'theme.palette.background.card'} />
  }
}

export default Admin
