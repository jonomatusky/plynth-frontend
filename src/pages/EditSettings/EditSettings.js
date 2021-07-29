import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Hidden,
} from '@material-ui/core'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'
import PackNameForm from 'pages/PacksView/components/PackNameForm'
import DangerZone from './components/DangerZone'
import PreviewLayout from 'layouts/PreviewLayout'

const EditSettings = () => {
  const { packId } = useParams()
  const { selectPack, updatePack, updateStatus } = usePackStore()

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

  return (
    <AdminNav>
      <EditBar>
        {pack && (
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item sm={12} md={7}>
              <Box minHeight="48px" />
              {pack && (
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <Paper>
                      <Box padding={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h4">Settings</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              Change the name of your pack. Currently, the name
                              is only visible to you.
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
                  <Grid item xs={12} sm={9}>
                    <DangerZone packId={packId} />
                  </Grid>
                </Grid>
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
