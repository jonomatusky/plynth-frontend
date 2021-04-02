import React, { useState } from 'react'
import { AppBar, makeStyles, Divider, Tabs, Tab, Box } from '@material-ui/core'
import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { Save } from '@material-ui/icons'

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
                label="Cards"
                component={RouterLink}
                to="cards"
                value="cards"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Appearance"
                component={RouterLink}
                to="appearance"
                value="appearance"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Access"
                component={RouterLink}
                to="access"
                value="access"
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Box>
          <Box paddingRight={1}>
            <Button
              size="small"
              endIcon={<Save />}
              onClick={handleSave}
              pending={isSaving}
              disableElevation
              component={Link}
              to="/admin"
            >
              <Box paddingLeft={0.5}>
                <b>{`Save & Close`}</b>
              </Box>
            </Button>
          </Box>
        </Box>
      </div>

      <Divider />
    </AppBar>
  )
}

export default EditBar
