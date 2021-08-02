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
} from '@material-ui/core'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import ButtonColorPicker from 'components/ButtonColorPicker'
import ButtonFont from 'components/ButtonFont'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'
import coloring from 'util/coloring'
import PreviewLayout from 'layouts/PreviewLayout'

const EditAppearance = () => {
  const { packId } = useParams()
  const { selectPack, updatePack, updateStatus } = usePackStore()

  const pack = selectPack(packId)
  const [cardIndex, setCardIndex] = useState(0)

  const { style } = pack || {}
  const { backgroundColor, buttonColor } = style || {}

  const handleColorChange = color => {
    const fontColor = coloring.getFontColor(color)

    updatePack({
      id: packId,
      style: { ...style, backgroundColor: color, fontColor: fontColor },
    })
  }

  const handleButtonColorchange = color => {
    const { buttonColor, buttonFontColor, ...newStyle } = style

    if (color) {
      const fontColor = coloring.getFontColor(color)
      newStyle.buttonColor = color
      newStyle.buttonFontColor = fontColor
    }

    updatePack({
      id: packId,
      style: newStyle,
    })
  }

  const handleFontChange = font => {
    updatePack({
      id: packId,
      style: { ...style, font },
    })
  }

  const [isSpinning, setIsSpinning] = useState(false)

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

  // const backgroundColors = [
  //   '#FFFFFF',
  //   '#000000',
  //   '#757575',
  //   '#2F87B3',
  //   '#FFF9F0',
  //   '#9DFFE8',
  //   '#CD0A64',
  //   '#FE6B8B',
  //   '#DCF10B',
  // ]
  // const buttonColors = backgroundColors

  return (
    <AdminNav>
      <EditBar>
        {pack && (
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item sm={12} md={7}>
              <Box
                height="calc(100vh - 48px)"
                width="100%"
                overflow="auto"
                display="flex"
                alignContent="center"
                pb={1}
              >
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={9}>
                    <Paper>
                      <Box padding={3} mt={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Typography variant="h4">
                              Edit Appearance
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Box minWidth="200px">
                              <Typography variant="h6" fontWeight={900}>
                                Colors
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>
                              <Box minWidth="200px">
                                <Typography>Background Color</Typography>
                              </Box>
                            </Grid>
                            <Grid item>
                              <ButtonColorPicker
                                color={backgroundColor || '#ffffff'}
                                onChange={handleColorChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>
                              <Box minWidth="200px">
                                <Typography>Button Color</Typography>
                              </Box>
                            </Grid>
                            <Grid item>
                              <ButtonColorPicker
                                color={buttonColor || '#ffffff'}
                                onChange={handleButtonColorchange}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Box minWidth="200px">
                              <Typography variant="subtitle2">
                                *Make sure to pick a buttoncolor that contrasts
                                with the background
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box mt={2} mb={1}>
                              <Divider />
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={900}>
                              Font
                            </Typography>
                          </Grid>

                          <Grid item xs={12} container spacing={2}>
                            <Grid item>
                              <ButtonFont
                                font={`'Degular', sans-serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Inter', sans-serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Josefin Sans', sans-serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Jacques Francois', serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Cutive Mono', monospace`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Patrick Hand', sans-serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonFont
                                font={`'Shadows Into Light', sans-serif`}
                                setFont={handleFontChange}
                              />
                            </Grid>
                          </Grid>
                          {/* <Grid item xs={12}>
                        <Typography variant="h5">Patterns</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Coming Soon...</Typography>
                        <Button variant="outline">Unlock</Button>
                      </Grid> */}
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

export default EditAppearance
