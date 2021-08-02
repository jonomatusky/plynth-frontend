import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
  Card,
  CardContent,
} from '@material-ui/core'
import { Add, ArrowForwardIos, Person } from '@material-ui/icons'

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
    <AdminNav>
      <BarAccount>
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
                          <Hidden smDown>
                            <Box mb={1} mt={1}>
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
                          </Hidden>
                          <Hidden smUp>
                            <IconButton onClick={handleOpen}>
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
                          </Hidden>
                        </Grid>
                        <Grid item xs={false} sm={1}></Grid>
                      </Grid>

                      {status === 'succeeded' && (packs || []).length === 0 && (
                        <Grid item xs={11} sm={9}>
                          <Hidden smDown>
                            <Typography align="center">
                              You don't have any packs yet! Create a new one to
                              get started <Emoji symbol="👆" label="up" />
                            </Typography>
                          </Hidden>
                          <Hidden smUp>
                            <Typography align="center">
                              You don't have any packs yet! Switch over to
                              desktop to start creating{' '}
                              <Emoji symbol="💻" label="desktop" />
                            </Typography>
                          </Hidden>
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
                        {(packs || []).map((pack, index) => {
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
                                <Hidden mdDown>
                                  <Box textAlign="center">
                                    {index === selectedPackIndex && (
                                      <ArrowForwardIos color="disabled" />
                                    )}
                                  </Box>
                                </Hidden>
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
              <Hidden mdDown>
                <Grid item md={5}>
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
              </Hidden>
            </Grid>
          </Container>
        </Box>
      </BarAccount>
    </AdminNav>
  )
}

export default PacksView
