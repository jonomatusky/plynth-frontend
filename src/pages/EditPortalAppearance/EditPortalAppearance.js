import React, { useEffect, useState } from 'react'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
  FormControlLabel,
  Switch,
  Divider,
} from '@material-ui/core'

import ButtonColorPicker from 'components/ButtonColorPicker'
import ButtonFont from 'components/ButtonFont'
import AdminNav from 'layouts/AdminNav'
import useUserStore from 'hooks/store/use-user-store'
import LivePreviewPortal from './components/LivePreviewPortal'
import PortalBar from 'components/PortalBar'
import FormPortalAppearance from './components/FormPortalAppearance'
import PortalImageUpload from './components/PortalImageUpload'
import coloring from 'util/coloring'
import BarAccount from 'layouts/BarAccount'
import PreviewLayout from 'layouts/PreviewLayout'

const EditPortalAppearance = () => {
  const { user, status, updateUser, updateStatus } = useUserStore()

  const portal = user.portal || {}
  const { style, hideBranding } = portal || {}
  const { backgroundColor, buttonColor } = style || {}

  const handleColorChange = color => {
    const fontColor = coloring.getFontColor(color)

    updateUser({
      portal: {
        ...portal,
        style: { ...style, backgroundColor: color, fontColor: fontColor },
      },
    })
  }

  const handleButtonColorchange = color => {
    const { buttonColor, buttonFontColor, ...newStyle } = style

    if (color) {
      const fontColor = coloring.getFontColor(color)
      newStyle.buttonColor = color
      newStyle.buttonFontColor = fontColor
    }

    updateUser({
      portal: { ...portal, style: newStyle },
    })
  }

  const handleFontChange = font => {
    updateUser({
      portal: {
        ...portal,
        style: { ...style, font },
      },
    })
  }

  const handleChangeBranding = event => {
    updateUser({ portal: { ...portal, hideBranding: event.target.checked } })
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

  const handleUpdatePortal = values => {
    updateUser({ portal: { ...portal, ...values } })
  }

  return (
    <AdminNav>
      <BarAccount>
        {status === 'succeeded' && (
          <Box height="calc(100vh - 48px)" overflow="hidden">
            <Grid container justifyContent="flex-start">
              <Grid item sm={12} md={7}>
                <PortalBar />
                <Box
                  height="calc(100vh - 96px)"
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
                            <Grid
                              item
                              xs={12}
                              container
                              justifyContent="center"
                            >
                              <Grid item>
                                <PortalImageUpload
                                  onSubmit={handleUpdatePortal}
                                  portal={portal}
                                  crop
                                />
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <FormPortalAppearance
                                portal={portal}
                                onSubmit={handleUpdatePortal}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              container
                              alignItems="center"
                              spacing={1}
                            >
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
                                    color={buttonColor || '#000000'}
                                    onChange={handleButtonColorchange}
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <Box minWidth="200px">
                                  <Typography variant="body2">
                                    *Make sure to pick a button color that
                                    contrasts with the background
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
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    {user && user.tier !== 'free' && (
                      <Grid item xs={9}>
                        <Paper>
                          <Box padding={3}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      color="primary"
                                      checked={hideBranding}
                                      onChange={handleChangeBranding}
                                    />
                                  }
                                  label="Hide branding"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </Grid>
                    )}
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
                        <LivePreviewPortal
                          portal={user.portal}
                          isLoading={updateStatus === 'loading'}
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
          </Box>
        )}
      </BarAccount>
    </AdminNav>
  )
}

export default EditPortalAppearance
