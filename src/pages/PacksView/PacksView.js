import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
  Card,
  CardContent,
} from '@mui/material'
import { Add, ArrowForwardIos, Person } from '@mui/icons-material'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import AdminNav from 'layouts/AdminNav'
import PackListItem from './components/PackListItem'
import Emoji from 'components/Emoji'
import PackNameForm from 'pages/PacksView/components/PackNameForm'
import { useHistory } from 'react-router'
import { useSession } from 'hooks/use-session'
import BarAccount from 'layouts/BarAccount'
import PreviewLayout from 'layouts/PreviewLayout'

const PacksView = () => {
  const history = useHistory()
  const { logout } = useSession()
  const { packs, status, createPack } = usePackStore()

  const packsFiltered = packs.filter(pack => {
    if ((pack.cards || []).length > 0 && pack.cards[0].type === 'ar') {
      return false
    } else {
      return true
    }
  })

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

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    logout()
  }

  const handleSubmitPackName = async values => {
    const createdPack = await createPack({
      name: values.name,
      style: { backgroundColor: '#FFF9F0', fontColor: '#333333' },
      isPublic: true,
      shareWithLink: true,
    })
    if (createdPack.id) {
      history.push(`packs/${createdPack.id}/edit/cards`)
    } else {
      setNewPack(null)
    }
  }

  return (
    <>
      <BarAccount />
      <AdminNav>
        <Box height="calc(100vh - 48px)" overflow="hidden">
          <Container disableGutters maxWidth={false}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={7}>
                <Box height="calc(100vh - 48px)" overflow="auto" pt={3}>
                  <Grid container justifyContent="center" spacing={3}>
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={1}
                      justifyContent="center"
                    >
                      <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={false} sm={1}></Grid>
                        {/* <Grid item xs={false} sm={1} /> */}
                        <Grid item xs={11} sm={9}>
                          <Box
                            mb={1}
                            mt={1}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={handleClick}
                              endIcon={<Add />}
                              fullWidth
                            >
                              <b>Create New Pack</b>
                            </Button>
                          </Box>
                          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton onClick={handleOpen} size="large">
                              <Person />
                            </IconButton>

                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              transitionDuration={0}
                              onClose={handleClose}
                            >
                              <MenuItem component={Link} to="/admin/account">
                                My account
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                          </Box>
                        </Grid>
                        <Grid item xs={false} sm={1}></Grid>
                      </Grid>

                      {status === 'succeeded' && (packs || []).length === 0 && (
                        <Grid item xs={11} sm={9}>
                          <Typography
                            align="center"
                            sx={{ display: { xs: 'none', md: 'block' } }}
                          >
                            You don't have any packs yet! Create a new one to
                            get started <Emoji symbol="👆" label="up" />
                          </Typography>
                          <Typography
                            align="center"
                            sx={{ display: { xs: 'block', md: 'none' } }}
                          >
                            You don't have any packs yet! Switch over to desktop
                            to start creating{' '}
                            <Emoji symbol="💻" label="desktop" />
                          </Typography>
                        </Grid>
                      )}
                      {newPack && (
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item xs={false} sm={1}></Grid>
                          {/* <Grid item xs={false} sm={1} /> */}
                          <Grid item xs={11} sm={9}>
                            <Card>
                              <CardContent>
                                <Grid
                                  container
                                  justifyContent="center"
                                  spacing={1}
                                >
                                  <Grid item xs={12}>
                                    <Typography variant="h5">
                                      New Pack
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <PackNameForm
                                      onSubmit={handleSubmitPackName}
                                      onCancel={handleCancel}
                                      buttonText="Get started"
                                    />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={false} sm={1}></Grid>
                        </Grid>
                      )}
                      <>
                        {(packsFiltered || []).map((pack, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              container
                              justifyContent="center"
                              alignItems="center"
                              key={pack.id}
                            >
                              <Grid item xs={false} sm={1} />
                              <Grid item xs={11} sm={9}>
                                <PackListItem
                                  pack={pack}
                                  isSelected={index === selectedPackIndex}
                                  onSelectPack={() => handleSelectPack(index)}
                                />
                              </Grid>
                              <Grid item xs={false} sm={1}>
                                <Box
                                  textAlign="center"
                                  sx={{ display: { xs: 'none', md: 'block' } }}
                                >
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
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <PreviewLayout>
                  <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12} container justifyContent="center">
                      <Box position="fixed">
                        {!!selectedPack.id && (
                          <LivePreview pack={selectedPack} />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </PreviewLayout>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </AdminNav>
    </>
  )
}

export default PacksView
