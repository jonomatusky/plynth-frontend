import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Hidden } from '@material-ui/core'
import { Add, ArrowForwardIos } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import AdminNav from 'layouts/AdminNav'
import Button from 'components/Button'
import PackListItem from './components/PackListItem'
import Emoji from 'components/Emoji'
import PackNameForm from 'components/PackNameForm'
import { useHistory } from 'react-router'

const PacksView = () => {
  const history = useHistory()
  const { packs, status, createPack } = usePackStore()

  const [selectedPackIndex, setSelectedPackIndex] = useState(0)
  const [newPack, setNewPack] = useState(null)

  const selectedPack = packs[selectedPackIndex] || {}

  const handleSelectPack = clickedPackIndex => {
    setSelectedPackIndex(clickedPackIndex)
  }

  const handleClick = () => {
    setNewPack({})
  }

  const handleCancel = () => {
    setNewPack(null)
  }

  const handleSubmitPackName = async values => {
    const createdPack = await createPack({
      name: values.name,
      style: { backgroundColor: '#FFF9F0', fontColor: '#333333' },
    })
    if (createdPack.id) {
      history.push(`admin/packs/${createdPack.id}/edit/cards`)
    } else {
      setNewPack(null)
    }
  }

  return (
    <AdminNav>
      {newPack && !newPack.name && (
        <Container maxWidth="sm">
          <Box paddingTop={12} />
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Name your new pack</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>(You can always change this later)</Typography>
            </Grid>
            <Grid item xs={12}>
              <PackNameForm
                onSubmit={handleSubmitPackName}
                onCancel={handleCancel}
                buttonText="Get started"
              />
            </Grid>
          </Grid>
        </Container>
      )}
      {!newPack && (
        <Container disableGutters maxWidth={false}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={7}>
              <Box minHeight="100vh">
                <Grid container justifyContent="center" spacing={3}>
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    xs={10}
                    spacing={2}
                    style={{ marginTop: '30px' }}
                  >
                    <Grid item>
                      <Typography variant="h4" align="center">
                        <b>My Packs</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClick}
                        endIcon={<Add />}
                      >
                        <b>Create New Pack</b>
                      </Button>
                    </Grid>
                  </Grid>
                  {status === 'succeeded' && (packs || []).length === 0 && (
                    <Grid item xs={10}>
                      <Typography align="center">
                        You don't have any packs yet! Create a new one to get
                        started <Emoji symbol="👆" label="up" />
                      </Typography>
                    </Grid>
                  )}
                  {(packs || []).length > 0 && (
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={1}
                      justifyContent="center"
                    >
                      <>
                        {packs.map((pack, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              container
                              justifyContent="flex-end"
                              alignItems="center"
                              key={pack.id}
                            >
                              <Grid item xs={10}>
                                <PackListItem
                                  pack={pack}
                                  isSelected={index === selectedPackIndex}
                                  onSelectPack={() => handleSelectPack(index)}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Box textAlign="center">
                                  {index === selectedPackIndex && (
                                    <ArrowForwardIos color="disabled" />
                                  )}
                                </Box>
                              </Grid>
                            </Grid>
                          )
                        })}
                        <Grid item xs={12}>
                          <Box height="20px" />
                        </Grid>
                      </>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
            <Hidden mdDown>
              <Grid item md={5}>
                <Box borderLeft={1} borderColor="divider" height="100%">
                  <Box minHeight="96px" />
                  <Grid container justifyContent="center">
                    <Grid item xs={12} container justifyContent="center">
                      <Box position="fixed">
                        {!!selectedPack.id && (
                          <LivePreview pack={selectedPack} />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      )}
    </AdminNav>
  )
}

export default PacksView
