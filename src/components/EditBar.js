import React, { useState } from 'react'
import {
  AppBar,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  Box,
  Button as MuiButton,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { CameraAlt, Check, Palette, Style } from '@material-ui/icons'

import theme from 'theme'
import Button from 'components/Button'

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

const EditBar = () => {
  const classes = useStyles()
  const location = useLocation()

  const [isSaving, setIsSaving] = useState(false)

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  const handleSave = () => {
    setIsSaving(true)
  }

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <div style={{ width: '100%' }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
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
                      <Style
                        style={{ transform: 'rotate(180deg)' }}
                        fontSize="small"
                      />
                    </Box>
                    <Box>
                      <Typography>Cards</Typography>
                    </Box>
                  </Box>
                }
                component={RouterLink}
                to="cards"
                value="cards"
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
                      <Palette fontSize="small" />
                    </Box>
                    <Box>
                      <Typography>Style</Typography>
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
                      <CameraAlt fontSize="small" />
                    </Box>
                    <Box>
                      <Typography>Share</Typography>
                    </Box>
                  </Box>
                }
                component={RouterLink}
                to="access"
                value="access"
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Box>
          <Box paddingRight={1}>
            <Grid container spacing={1}>
              <Grid item>
                <MuiButton
                  color="secondary"
                  component={RouterLink}
                  to="settings"
                  value="settings"
                >
                  Settings
                </MuiButton>
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>

      <Divider />
    </AppBar>
  )
}

export default EditBar
