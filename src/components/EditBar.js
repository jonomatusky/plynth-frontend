import React from 'react'
import {
  AppBar,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  Grid,
  Box,
  Button as MuiButton,
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Public } from '@material-ui/icons'

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
})

const EditBar = () => {
  const classes = useStyles()
  const location = useLocation()

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            // onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab
              label="Cards"
              component={RouterLink}
              to="cards"
              value="cards"
              disableRipple
            />
            <Tab
              label="Appearance"
              component={RouterLink}
              to="appearance"
              value="appearance"
              disableRipple
            />
            <Tab
              label="Access"
              component={RouterLink}
              to="access"
              value="access"
              disableRipple
            />
          </Tabs>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <MuiButton
                size="small"
                color="default"
                component={RouterLink}
                to={'/admin'}
              >
                Save as Draft
              </MuiButton>
            </Grid>
            <Grid item>
              <Box paddingRight={2}>
                <Button
                  size="small"
                  endIcon={<Public />}
                  component={RouterLink}
                  to={'/admin'}
                >
                  <Box paddingLeft={0.5} paddingRight={0.5}>
                    <b>Publish</b>
                  </Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />
    </AppBar>
  )
}

export default EditBar
