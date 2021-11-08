import React, { useEffect, useRef, useState } from 'react'
import 'mind-ar/dist/mindar-image.prod.js'
import { Link, useParams } from 'react-router-dom'
import { Grid, Box, Container, Button, Paper, Typography } from '@mui/material'
import {
  Launch,
  Link as LinkIcon,
  People,
  PhoneIphone,
  QrCode2,
  VideoCameraBack,
  AutoFixHigh,
  Download,
  FilterNone,
  ArrowForward,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'

import BarEditPiece from 'layouts/BarEditPiece'
import AddMediaButton from './components/AddMediaButton'
import WelcomeDialog from './components/WelcomeDialog'
import { useSession } from 'hooks/use-session'
import { useRequest } from 'hooks/use-request'
import { useAlertStore } from 'hooks/store/use-alert-store'
import axios from 'axios'
import { loadImgAsync } from 'util/imageHandling'
import DownloadQR from 'components/DownloadQr'
import usePageTrack from 'hooks/use-page-track'
import { useFetch } from 'hooks/use-fetch'
import SomethingWentWrong from 'components/SomethingWentWrong'

const { REACT_APP_ASSET_URL, REACT_APP_PUBLIC_URL } = process.env

const Preview = () => {
  const { user } = useSession()
  const [pack, setPack] = useState(null)

  const { pieceId, cardId } = useParams()
  const experiencePage = REACT_APP_PUBLIC_URL + '/p/' + pieceId

  useFetch()
  usePageTrack()

  const { request, status } = useRequest()

  useEffect(() => {
    const getPack = async () => {
      try {
        const response = await request({
          url: `/packs/${pieceId}`,
          method: 'GET',
        })
        const { pack } = response || {}
        setPack(pack)

        const { style } = pack || {}

        if (pack && pack.isPublic && pack.shareWithLink) {
          if ((style || {}).backgroundColor) {
            document.body.style.backgroundColor = style.backgroundColor
          }
        }
      } catch (err) {}
    }
    if (status === 'idle') {
      getPack()
    }
  }, [pieceId, request, status])

  const { cards, isPublic } = pack || {}
  const card = (cards || [{}])[0]
  const { imageUrl, imageHeight, imageWidth, type } = card

  console.log(card)

  const { setMessage } = useAlertStore()

  const DisplayCard = () => {
    return (
      <Box
        backgroundColor="white"
        border="2px solid #ddd"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={6}
        sx={{
          transform: 'rotate(3deg)',
          width: { xs: '350px', lg: '450px' },
          height: {
            xs: imageUrl ? (imageHeight / imageWidth) * 350 + 'px' : '525px',
            lg: imageUrl ? (imageHeight / imageWidth) * 450 + 'px' : '675px',
          },
        }}
        mr={2}
        boxShadow="5px 5px 15px #00000040"
        position="relative"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            width="100%"
            height="100%"
            alt="preview"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          />
        )}
      </Box>
    )
  }

  const [isLoading, setIsLoading] = useState(false)
  const [percent, setPercent] = useState(0)

  return (
    <>
      <BarEditPiece />
      {isPublic && cardId === card.id && imageUrl ? (
        <AdminNav isPublic>
          <Box
            height="calc(100vh - 48px)"
            width="100%"
            overflow="auto"
            display="flex"
            alignContent="center"
          >
            <Container disableGutters maxWidth="lg">
              <Grid container justifyContent="flex-start">
                <Grid item sm={12} md={7} container justifyContent="center">
                  <Grid item xs={11} lg={9}>
                    <Box margin={4}>
                      <Paper>
                        <Box padding={4} pb={2}>
                          <Box
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            width="100%"
                            flexWrap="wrap"
                          ></Box>
                        </Box>
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <DisplayCard />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </AdminNav>
      ) : (
        <SomethingWentWrong />
      )}
      {/* <Dialog
        onClose={handleRemoveClose}
        aria-labelledby="remove-dialog-title"
        open={removeDialogIsOpen}
      >
        <DialogTitle id="remove-dialog-title">Remove Card</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this card? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleRemoveClose}>Cancel</MuiButton>
          <MuiButton onClick={handleDeleteCard}>Remove</MuiButton>
        </DialogActions>
      </Dialog> */}
    </>
  )
}

export default Preview
