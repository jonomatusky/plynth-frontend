import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
  Divider,
  Switch,
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

const { REACT_APP_PUBLIC_URL } = process.env

const EditAccess = () => {
  const { packId } = useParams()
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
      <EditBar />
      <Box height="100vh">
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          style={{ height: `100vh` }}
        >
          <Grid item sm={12} md={8}>
            <Box minHeight="48px" />

            <Box minHeight="48px" />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={9}>
                <Paper>
                  <Box padding={3}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h4">Manage Access</Typography>
                      </Grid>
                      <Grid item xs={12} container alignItems="center">
                        <Grid item>
                          <Typography>
                            <b>This pack is:</b>
                          </Typography>
                        </Grid>
                        <Grid item>
                          {pack && (
                            <Switch
                              color="primary"
                              checked={pack.isPublic}
                              onChange={handleChangeAvailability}
                            />
                          )}
                          {!pack && <Switch checked={false} disabled />}
                        </Grid>
                        <Grid item>
                          <Typography>
                            {(pack || {}).isPublic ? 'PUBLIC' : 'PRIVATE'}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <b>Share:</b> {packLink}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1"></Typography>
                        <ButtonCopyToClipboard textToCopy={packLink}>
                          Copy Link
                        </ButtonCopyToClipboard>
                      </Grid>
                      <Grid item xs={12}>
                        <Box width="100%" pb={3}>
                          <Divider />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">
                          Link to Physical Artwork
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Link this bundle to art in the real-world. Fans snap a
                          photo at www.plynth.com to access.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <b>
                          Upload photos or art files to link them to this bundle
                        </b>
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex">
                          {(pieces || []).length > 0 &&
                            pieces.map(piece => {
                              return <PieceImage piece={piece} key={piece.id} />
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
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <Box
                borderLeft={1}
                borderColor="divider"
                height="calc(100vh - 48px)"
                marginTop="48px"
                paddingTop="24px"
                overflow="hidden"
              >
                <Box width="100%">
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <Box paddingBottom={2}>
                        <Typography align="center" color="textSecondary">
                          LIVE PREVIEW
                        </Typography>
                      </Box>
                    </Grid>
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
                </Box>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </AdminNav>
  )
}

export default EditAccess
