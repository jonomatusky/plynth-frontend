import React, { useState } from 'react'
import { useParams } from 'react-router'
import posthog from 'posthog-js'
import {Container} from '@mui/material'

import {request} from 'utils/client'


const QrScan = () => {
  const {qrId} = useParams()
  cons
  const [status, setStatus] = useState('idle')
  const [qr, setQr] = useState(null)

  posthog.identify(user.uid, {
    email: user.email,
    displayName: user.displayName,
  })

  useEffect(() => {
    const getQR = async () => {
      const res = await request (
        url: `/qr`,
        body: {
          qrId
        }
      )

      return res
    }

    if (qrId) {
      let res = getQR()
      setQr(res.qr)
      setStatus('succeeded')
    }
  })

  if (!!qr) {
    history.push(qr.url)
  } else if (status !== 'succeeded') {
    <Container>
    </Container>
  } else {
    return <LoadingScreen />
  }

  return 
}

export default QrScan
