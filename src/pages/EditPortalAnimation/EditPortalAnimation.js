import React, { useEffect, useState } from 'react'
import { Grid, Box, CircularProgress, Paper, Typography } from '@mui/material'

import ButtonColorPicker from 'components/ButtonColorPicker'
import AdminNav from 'layouts/AdminNav'
import useUserStore from 'hooks/store/use-user-store'
import PortalBar from 'components/PortalBar'
import PortalLoadingUpload from './components/PortalLoadingUpload'
import LivePreviewPortalLoading from './components/LivePreviewPortalLoading'
import BarAccount from 'layouts/BarAccount'
import PreviewLayout from 'layouts/PreviewLayout'

const EditPortalAnimation = () => {
  const { user, status, updateUser, updateStatus } = useUserStore()

  const portal = user.portal || {}
  const { style } = portal || {}
  const { animationBackgroundColor, animationColor } = style || {}

  const handleColorChange = color => {
    updateUser({
      portal: {
        ...portal,
        style: {
          ...style,
          animationBackgroundColor: color,
        },
      },
    })
  }

  const handleAnimationColorChange = color => {
    updateUser({
      portal: {
        ...portal,
        style: { ...style, animationColor: color },
      },
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
                                <PortalLoadingUpload
                                  onSubmit={handleUpdatePortal}
                                  portal={portal}
                                  crop
                                />
                              </Grid>
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
                                    color={
                                      animationBackgroundColor || '#ffffff'
                                    }
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
                                    <Typography>Animation Color</Typography>
                                  </Box>
                                </Grid>
                                <Grid item>
                                  <ButtonColorPicker
                                    color={animationColor || '#ffffff'}
                                    onChange={handleAnimationColorChange}
                                  />
                                </Grid>
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

              <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <PreviewLayout>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} container justifyContent="center">
                      <LivePreviewPortalLoading
                        portal={user.portal}
                        isLoading={updateStatus === 'loading'}
                      />
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                      <Box paddingTop={4}>
                        {true && (
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
            </Grid>
          </Box>
        )}
      </BarAccount>
    </AdminNav>
  )
}

export default EditPortalAnimation
