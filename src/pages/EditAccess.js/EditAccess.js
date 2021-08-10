import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
  Switch,
  Button,
} from '@material-ui/core'
// import QRCode from 'qrcode.react'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import ImageUpload from 'components/ImageUpload'
import ButtonUpload from 'components/ButtonUpload'
import ButtonCopyToClipboard from 'components/ButtonCopyToClipboard'
import { useRequest } from 'hooks/use-request'
import PieceImage from './components/PieceImage'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'
import DownloadQR from 'components/DownloadQr'
import { GetApp } from '@material-ui/icons'
import useUserStore from 'hooks/store/use-user-store'
import PreviewLayout from 'layouts/PreviewLayout'

const { REACT_APP_PUBLIC_URL } = process.env

const EditAccess = () => {
  const { packId } = useParams()
  const { user } = useUserStore()
  const { selectPack, updatePack, updateStatus, fetchPacks } = usePackStore()
  const { request } = useRequest()

  const pack = selectPack(packId)
  const [cardIndex, setCardIndex] = useState(0)
  const packLink = `${REACT_APP_PUBLIC_URL}/p/${packId}`

  const [isSpinning, setIsSpinning] = useState(false)
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const setSpinning = () => {
      setIsSpinning(true)
    }
    const stopSpinning = () => {
      setTimeout(() => {
        if (isSpinning === true) {
          setIsSpinning(false)
        }
      }, 500)
    }
    if (updateStatus === 'loading') {
      setSpinning()
    } else {
      stopSpinning()
    }
  }, [updateStatus, isSpinning])

  useEffect(() => {
    const setPiecesState = () => {
      setPieces(pack.pieces)
    }
    if (!!pack) {
      setPiecesState()
    }
  }, [pack])

  const handleChangeAvailability = event => {
    updatePack({ id: packId, isPublic: event.target.checked })
  }

  const handleShareWithLink = event => {
    updatePack({ id: packId, shareWithLink: event.target.checked })
  }

  const handleNewImage = async imageFilePath => {
    setPieces([...pieces, { id: `pending` }])

    const pieceData = {
      title: pack.name,
      pack: packId,
      isDirect: true,
      directLink: packLink,
      image: imageFilePath,
    }

    try {
      await request({
        url: `/pieces`,
        method: 'POST',
        data: pieceData,
      })
    } catch (err) {}

    fetchPacks()
  }

  return (
    <AdminNav>
      <EditBar>
        {pack && (
          <Grid container justifyContent="center">
            <Grid item sm={12} md={7}>
              <Box
                height="calc(100vh - 48px)"
                width="100%"
                overflow="auto"
                pb={1}
              >
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={9}>
                    <Paper>
                      <Box padding={3} pb={1} mt={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h4">
                              Link to Artwork
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="body2">
                              Link this pack to physical artwork. Users snap a
                              photo at <b>www.plynth.com/{user.username}</b> to
                              access your pack.
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <b>
                              Upload photos or art files to link them to this
                              pack
                            </b>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex">
                              {(pieces || []).length > 0 &&
                                pieces.map(piece => {
                                  return (
                                    <PieceImage piece={piece} key={piece.id} />
                                  )
                                })}
                              <Grid item>
                                <Box mb={4}>
                                  <ImageUpload onSubmit={handleNewImage}>
                                    <ButtonUpload />
                                  </ImageUpload>
                                </Box>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={9}>
                    <Paper>
                      <Box padding={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6">
                              Share with a link or QR code.
                            </Typography>
                          </Grid>
                          <Grid item xs={12} container alignItems="center">
                            <Grid item>
                              <Switch
                                color="primary"
                                checked={!!pack.shareWithLink}
                                onChange={handleShareWithLink}
                              />
                            </Grid>
                            <Grid item>
                              <Typography>
                                <b>
                                  {pack.shareWithLink
                                    ? 'Link sharing on'
                                    : 'Link sharing off'}
                                </b>
                              </Typography>
                            </Grid>
                          </Grid>
                          {pack.shareWithLink && (
                            <>
                              <Grid item xs={12}>
                                <Typography variant="body2">
                                  <b>URL:</b> {packLink}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} container spacing={2}>
                                <Grid item>
                                  <ButtonCopyToClipboard textToCopy={packLink}>
                                    Copy Link
                                  </ButtonCopyToClipboard>
                                </Grid>
                                <Grid item>
                                  <DownloadQR
                                    qrValue={packLink + '?utm_source=qr'}
                                    fileName={
                                      `QR Code ` +
                                      (pack.name || 'Pack').replace(
                                        /[/\\?%*:|"<>]/g,
                                        '_'
                                      ) +
                                      '.png'
                                    }
                                  >
                                    <Button
                                      endIcon={
                                        <GetApp
                                          fontSize="small"
                                          // sx={{ color: 'text.primary' }}
                                        />
                                      }
                                      size="small"
                                      style={{ textTransform: 'none' }}
                                      color="secondary"
                                      disableElevation
                                    >
                                      <Box color="text.primary">
                                        <Typography variant="body2">
                                          Download QR
                                        </Typography>
                                      </Box>
                                    </Button>
                                  </DownloadQR>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={9}>
                    <Paper>
                      <Box padding={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} container alignItems="center">
                            <Grid item>
                              <Typography>
                                <b>This pack is:</b>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Switch
                                color="primary"
                                checked={!!pack.isPublic}
                                onChange={handleChangeAvailability}
                              />
                            </Grid>
                            <Grid item>
                              <Typography>
                                {pack.isPublic ? 'PUBLIC' : 'PRIVATE'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Box minHeight="24px" />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Hidden mdDown>
              <Grid item md={5}>
                <PreviewLayout>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} container justifyContent="center">
                      <LivePreview
                        pack={pack}
                        cardIndex={cardIndex}
                        isLoading={updateStatus === 'loading'}
                        setIndex={setCardIndex}
                      />
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                      <Box paddingTop={4}>
                        {isSpinning && (
                          <CircularProgress
                            size="1.25rem"
                            color="inherit"
                            thickness={6}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </PreviewLayout>
              </Grid>
            </Hidden>
          </Grid>
        )}
      </EditBar>
    </AdminNav>
  )
}

export default EditAccess
