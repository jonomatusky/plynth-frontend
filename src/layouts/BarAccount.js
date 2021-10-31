import React, { useState } from 'react'
import {
  AppBar,
  Divider,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Link,
  Button,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'
import ButtonSharePortal from 'components/ButtonSharePortal'
import OnboardingTooltip from 'components/OnboardingTooltip'

const drawerWidth = 70

const { REACT_APP_PUBLIC_URL } = process.env

const useStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  tabRoot: {
    minWidth: 120,
  },
})

const BarAccount = ({ children }) => {
  const [portalTooltipIsOpen, setPortalTooltipIsOpen] = useState(true)

  const { user } = useUserStore()
  const classes = useStyles()
  const location = useLocation()

  const { username } = user || {}

  const portalUrl = REACT_APP_PUBLIC_URL + '/' + username

  const urlElements = location.pathname.split('/')
  const value = urlElements.slice(0, 3).join('/')

  const { portal, completedSignup } = user || {}
  const { title, text, image } = portal || {}
  const showPortalReminder =
    !!completedSignup &&
    !title &&
    !text &&
    !image &&
    portalTooltipIsOpen &&
    value === '/admin/packs'

  const userType =
    user.tier === 'free' ||
    user.tier === 'artist' ||
    user.tier === 'agency' ||
    user.tier === 'trial'
      ? 'old'
      : 'new'

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <div style={{ width: '100%' }}>
          <Grid container>
            {/* {(user.admin || userType === 'old') && (
              <>
                <Grid item sm={12} md={7}>
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      label={
                        <Typography>
                          <b>Packs</b>
                        </Typography>
                      }
                      component={RouterLink}
                      to="/admin/packs"
                      value="/admin/packs"
                      classes={{ root: classes.tabRoot }}
                    />
                    <Tab
                      label={
                        <OnboardingTooltip
                          onClose={() => setPortalTooltipIsOpen(false)}
                          placement="bottom"
                          open={showPortalReminder}
                          title="It looks like you haven't set up your portal yet! Click here to get started."
                        >
                          <Typography>
                            <b>Portal</b>
                          </Typography>
                        </OnboardingTooltip>
                      }
                      component={RouterLink}
                      to="/admin/portal/appearance"
                      onClick={() => setPortalTooltipIsOpen(false)}
                      value="/admin/portal"
                      classes={{ root: classes.tabRoot }}
                    />

                    {user.admin && (
                      <Tab
                        label={
                          <Typography>
                            <b>Pieces</b>
                          </Typography>
                        }
                        component={RouterLink}
                        to="/admin/pieces"
                        value="/admin/pieces"
                        classes={{ root: classes.tabRoot }}
                      />
                    )}
                  </Tabs>
                </Grid>

                <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box
                    borderLeft={1}
                    borderColor="divider"
                    height="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pl={2}
                    pr={2}
                  >
                    {username && (
                      <>
                        <Typography variant="subtitle2">
                          <b>Your Portal: </b>
                          <Link
                            href={portalUrl}
                            target="_blank"
                            color="inherit"
                            underline="always"
                          >
                            {portalUrl}
                          </Link>
                        </Typography>
                        <ButtonSharePortal url={portalUrl} />
                      </>
                    )}
                  </Box>
                </Grid>
              </>
            )} */}
            <Grid item container>
              <Box
                pl="24px"
                height="48px"
                display="flex"
                alignItems="center"
                width="100%"
              >
                <Box flexGrow={1}>
                  <Typography variant="h5">
                    <b>Your Pieces</b>
                  </Typography>
                </Box>
                <Box pr={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    // onClick={handleClick}
                    disableElevation
                    sx={{ textTransform: 'none' }}
                  >
                    <b>Invite Friends</b>
                  </Button>
                </Box>
                <Box pr={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleClick}
                    disableElevation
                    sx={{ textTransform: 'none' }}
                  >
                    <b>Upgrade</b>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Divider />
      </AppBar>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>{children}</Box>

      <Box
        height="calc(100vh-48px)"
        mt="48px"
        overflow="hidden"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {children}
      </Box>
    </>
  )
}

export default BarAccount
