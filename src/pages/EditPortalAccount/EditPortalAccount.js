import React, { useEffect, useState } from 'react'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
} from '@material-ui/core'

import LivePreviewPortal from 'components/LivePreviewPortal'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'
import useUserStore from 'hooks/store/use-user-store'
import UserForm from 'components/UserForm'

const PortalAccount = () => {
  const [cardIndex, setCardIndex] = useState(0)

  const { user, status, updateUser, updateStatus } = useUserStore()

  const { portal } = user || {}

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

  const handleSubmit = values => {
    updateUser({ ...values })
  }

  return (
    <AdminNav>
      <EditBar />
      <Box height="100vh">
        {user && (
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
                    {status === 'succeeded' && (
                      <Box p={3}>
                        <Grid container justifyContent="center" spacing={3}>
                          <Grid item xs={12}>
                            <Typography variant="h6">Profile Info</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <UserForm
                              user={user}
                              onSubmit={handleSubmit}
                              submitLabel="Update"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
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
                        <LivePreviewPortal
                          portal={portal}
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
        )}
      </Box>
    </AdminNav>
  )
}

export default PortalAccount
