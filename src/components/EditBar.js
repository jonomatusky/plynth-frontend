import React, { useState } from 'react'
import { AppBar, Divider, Tabs, Tab, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { CameraAlt, Check, Palette, Style } from '@mui/icons-material'

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

const EditBar = ({ children }) => {
  const classes = useStyles()
  const location = useLocation()

  const [isSaving, setIsSaving] = useState(false)

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  const handleSave = () => {
    setIsSaving(true)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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

            <Tab
              component={RouterLink}
              to="settings"
              value="settings"
              classes={{ root: classes.tabRoot }}
              label={<Typography variant="body2">Settings</Typography>}
            />
          </Tabs>
          <Box mr={1}>
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
        </Box>
        <Divider />
      </AppBar>
      <Box height="calc(100vh - 48px)" overflow="hidden" mt="48px">
        {children}
      </Box>
    </>
  )
}

export default EditBar
