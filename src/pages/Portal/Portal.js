import LoadingScreen from 'components/LoadingScreen'
import PortalContent from 'components/PortalContent'
import { useRequest } from 'hooks/use-request'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Portal = () => {
  const { status, request } = useRequest()
  const [user, setUser] = useState(null)

  const { username } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await request({
          url: `/users/${username}`,
          quiet: true,
        })
        setUser(responseData.user)
      } catch (err) {}
    }
    if (!user) {
      fetchUser()
    }
  }, [request, username, user])

  const { portal } = user || {}

  const { style } = portal || {}
  const { backgroundColor } = style || {}

  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor
    }
  }, [backgroundColor])

  return (
    <>
      {status === 'failed' && <NotFoundPage />}
      {user && status === 'succeeded' && <PortalContent portal={portal} />}
      {!user && status !== 'failed' && <LoadingScreen />}
    </>
  )
}

export default Portal
