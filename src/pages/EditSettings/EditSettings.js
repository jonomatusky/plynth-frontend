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
} from '@material-ui/core'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'
import PackNameForm from 'pages/PacksView/components/PackNameForm'
import DangerZone from './components/DangerZone'
import PreviewLayout from 'layouts/PreviewLayout'
import useUserStore from 'hooks/store/use-user-store'

const EditSettings = () => {
  const { packId } = useParams()
  const { selectPack, updatePack, updateStatus } = usePackStore()
  const { user } = useUserStore()

  const pack = selectPack(packId)
  const [cardIndex, setCardIndex] = useState(0)

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
    updatePack({ id: packId, name: values.name })
  }

  const handleMakeDefault = event => {
    updatePack({ id: packId, isDefault: event.target.checked })
  }

  return (
    <AdminNav>
      <EditBar>
        {pack && (
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item sm={12} md={7}>
              {pack && (
                <Box
                  height="calc(100vh - 48px)"
                  width="100%"
                  overflow="auto"
                  pb={1}
                >
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={9}>
                      <Paper>
                        <Box padding={3} mt={3}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h4">Settings</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                Change the name of your pack. Currently, the
                                name is only visible to you.
                              </Typography>
                            </Grid>
                            <Grid item xs={12} container alignItems="center">
                              <Grid item xs={12}>
                                <PackNameForm
                                  onSubmit={handleSubmit}
                                  buttonText="Save"
                                  name={pack.name}
                                  pending={updateStatus === 'loading'}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    {user.admin && (
                      <Grid item xs={12} sm={9}>
                        <Paper>
                          <Box padding={3}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography variant="h6">
                                  Make Default
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  Make this one of the default packs for all
                                  users
                                </Typography>
                              </Grid>
                              <Grid item xs={12} container alignItems="center">
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={!!pack.isDefault}
                                    onChange={handleMakeDefault}
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography>
                                    {pack.isDefault ? 'Default' : 'Not Default'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={9}>
                      <DangerZone packId={packId} />
                    </Grid>{' '}
                    <Grid item xs={12}>
                      <Box minHeight="24px" />
                    </Grid>
                  </Grid>
                </Box>
              )}
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

export default EditSettings
