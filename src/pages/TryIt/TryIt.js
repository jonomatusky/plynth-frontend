import React, { useEffect, useState } from 'react'
import { Container, Box } from '@material-ui/core'

import PublicNav from 'layouts/PublicNav'
import EmailForm from './components/EmailForm'
import ImageUploadForm from './components/ImageUploadForm'
import LinkForm from './components/LinkForm'
import UsernameForm from './components/UsernameForm'
import RegisterForm from './components/RegisterForm'
import { useSession } from 'hooks/use-session'
import { setError } from 'redux/alertSlice'
import useUserStore from 'hooks/store/use-user-store'
import { useHistory } from 'react-router-dom'
import usePackStore from 'hooks/store/use-pack-store'
import { useRequest } from 'hooks/use-request'

const TryIt = ({ title, text }) => {
  const history = useHistory()
  const { user } = useSession()
  const { createMe } = useUserStore()
  const { createPack } = usePackStore()
  const { request } = useRequest()

  const [setStatus] = useState('idle')
  const [email, setEmail] = useState()
  const [image, setImage] = useState()
  const [type, setType] = useState()
  const [link, setLink] = useState()
  const [username, setUsername] = useState()
  const [loggedIn, setLoggedIn] = useState()

  // const handleSubmit = async ({ email, password }) => {
  //   setStatus('loading')
  //   try {
  //     await logout()
  //     await firebase.auth().createUserWithEmailAndPassword(email, password)
  //     setStatus('succeeded')
  //   } catch (err) {
  //     if (err.code === 'auth/invalid-email') {
  //       setError({ message: 'Please enter a valid email address' })
  //     } else if (err.code === 'auth/email-already-in-use') {
  //       setError({
  //         message: `Another account is using ${email}. Please sign in instead.`,
  //       })
  //     } else {
  //       setError({
  //         message:
  //           'There was an error creating your account. Please try again.',
  //       })
  //     }
  //   }
  // }

  useEffect(() => {
    const handleLoggedIn = async () => {
      try {
        await createMe({ username })
        const createdPack = await createPack({
          name: 'Your first pack',
          style: { backgroundColor: '#FFF9F0', fontColor: '#333333' },
          isPublic: true,
          shareWithLink: true,
          cards: [
            {
              type,
              url: type !== 'text' ? link : null,
              text: type === 'text' ? link : null,
            },
            {
              type: 'text',
              text: 'Now visit plynth.com on your desktop to customize this piece and add more item.',
            },
          ],
        })

        const pieceData = {
          title: 'My First Piece',
          pack: createdPack.id,
          isDirect: true,
          image,
        }

        await request({
          url: `/pieces`,
          method: 'POST',
          data: pieceData,
        })
      } catch (err) {
        setError({
          message: 'Sorry, something went wrong. Please try again.',
        })
      }

      try {
      } catch (err) {}

      history.push(`/try-it/test`)
    }

    if (user && loggedIn) {
      handleLoggedIn()
    }
  }, [
    createMe,
    user,
    loggedIn,
    history,
    username,
    createPack,
    link,
    type,
    image,
    request,
  ])

  return (
    <PublicNav right={<></>} hideFooter>
      <Container maxWidth="xs">
        <Box mt={5}>
          {/* {status === 'loading' ? } */}
          {!email ? (
            <EmailForm
              onSubmit={email => setEmail(email)}
              setStatus={setStatus}
            />
          ) : !image ? (
            <ImageUploadForm
              onSubmit={image => setImage(image)}
              setStatus={setStatus}
            />
          ) : !type && !link ? (
            <LinkForm
              onSubmit={({ type, link }) => {
                setType(type)
                setLink(link)
              }}
              setStatus={setStatus}
            />
          ) : !username ? (
            <UsernameForm
              onSubmit={username => setUsername(username)}
              setStatus={setStatus}
            />
          ) : (
            <RegisterForm
              setStatus={setStatus}
              onSubmit={() => setLoggedIn(true)}
              email={email}
            />
          )}
        </Box>
      </Container>
    </PublicNav>
  )
}

export default TryIt
