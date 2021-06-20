import React from 'react'
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
  Button,
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'

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

const PortalBar = () => {
  const { user } = useUserStore()
  const classes = useStyles()
  const location = useLocation()

  const { username } = user || {}

  const portalUrl = REACT_APP_PUBLIC_URL + '/' + username

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  return (
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
                label="Appearance"
                component={RouterLink}
                to="appearance"
                value="appearance"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Animation"
                component={RouterLink}
                to="animation"
                value="animation"
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
                    <Button variant="outlined" size="small" color="secondary">
                      Share
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Hidden>
        </Grid>

        {/* <Box display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1}>

          </Box>
          <Box paddingRight={1}>
            <Button
              size="small"
              endIcon={<Check />}
              onClick={handleSave}
              pending={isSaving}
              disableElevation
              component={Link}
              to="/admin"
            >
              <Box paddingLeft={0.5}>
                <b>{`Done`}</b>
              </Box>
            </Button>
          </Box>
        </Box> */}
      </div>

      <Divider />
    </AppBar>
  )
}

export default PortalBar
