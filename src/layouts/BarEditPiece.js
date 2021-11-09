import React from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { AppBar, Divider, Button, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { ArrowBackIos, Visibility } from '@mui/icons-material'

import theme from 'theme'

const useStyles = makeStyles({
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  tabRoot: {
    minWidth: 120,
  },
})

const BarEditPiece = ({ previewPageUrl }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Box width="100%" display="flex" height="48px" alignItems="center">
          <Box pl={1}>
            <Button
              component={RouterLink}
              to="/admin/pieces"
              color="secondary"
              startIcon={<ArrowBackIos />}
            >
              Home
            </Button>
          </Box>
          <Box flexGrow={1} />

          <Box pr={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
            {previewPageUrl && (
              <Button
                variant="outlined"
                color="primary"
                href={previewPageUrl}
                target="_blank"
                disableElevation
                sx={{ textTransform: 'none' }}
                endIcon={<Visibility />}
              >
                View Preview Page
              </Button>
            )}
          </Box>
        </Box>
        <Divider />
      </AppBar>
    </>
  )
}

export default BarEditPiece
