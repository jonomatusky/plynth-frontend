import React from 'react'
import {
  makeStyles,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import { MovieFilter, Palette } from '@material-ui/icons'

const drawerWidth = 70

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
  const classes = useStyles()
  const location = useLocation()

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  return (
    // <AppBar className={classes.appBar} elevation={0} top="48px">
    <Paper
      square
      elevation={0}
      variant="outlined"
      sx={{ borderRight: 0, borderLeft: 0, backgroundColor: '#FDFDFD' }}
    >
      <div style={{ width: '100%' }}>
        <Grid container>
          <Grid item sm={12} md={7}>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              // onChange={handleChange}
            >
              <Tab
                label={
                  <Box display="flex" alignItems="center">
                    <Box
                      mr={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Palette fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="body2">Appearance</Typography>
                    </Box>
                  </Box>
                }
                component={RouterLink}
                to="appearance"
                value="appearance"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label={
                  <Box display="flex" alignItems="center">
                    <Box
                      mr={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MovieFilter fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="body2">Animation</Typography>
                    </Box>
                  </Box>
                }
                component={RouterLink}
                to="animation"
                value="animation"
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Grid>
          {/* <Hidden mdDown>
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
          </Hidden> */}
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
    </Paper>

    // <Divider />
    // </AppBar>
  )
}

export default PortalBar
