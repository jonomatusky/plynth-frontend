import React, { useState } from 'react'
import {
  AppBar,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  Box,
  Grid,
  Hidden,
  Typography,
  Link,
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'
import ButtonSharePortal from '../components/ButtonSharePortal'
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
    completedSignup &&
    !title &&
    !text &&
    !image &&
    portalTooltipIsOpen &&
    value === '/admin/packs'

  return (
    <>
      <Hidden smDown>
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <div style={{ width: '100%' }}>
            <Grid container>
              <Grid item sm={12} md={7}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  // onChange={handleChange}
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
                </Tabs>
              </Grid>
              <Hidden mdDown>
                <Grid item md={5}>
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
              </Hidden>
            </Grid>
          </div>

          <Divider />
        </AppBar>
      </Hidden>
      <Hidden smUp>{children}</Hidden>
      <Hidden smDown>
        <Box height="calc(100vh-48px)" mt="48px" overflow="hidden">
          {children}
        </Box>
      </Hidden>
    </>
  )
}

export default BarAccount
