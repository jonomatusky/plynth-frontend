import React, { useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import // Grid,
// Box,
// Menu,
// MenuItem,
// Drawer,
// Divider,
// IconButton,
// Link as MuiLink,
'@mui/material'
// import { Portrait } from '@mui/icons-material'
// import { Person, HelpOutline } from '@mui/icons-material'

import { useFetch } from 'hooks/use-fetch'
// import { useSession } from 'hooks/use-session'
import usePageTrack from 'hooks/use-page-track'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useAlertStore from 'hooks/store/use-alert-store'
import usePackStore from 'hooks/store/use-pack-store'
import { Box } from '@mui/system'

// import useAlertStore from 'hooks/store/use-alert-store'

export const drawerWidth = 70

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    // paddingRight: theme.spacing(3),
    // paddingLeft: theme.spacing(3),
  },
}))

const AdminNav = ({ isPublic, children }) => {
  const { status } = useUserStore()

  const { status: packStatus } = usePackStore()
  const { setError } = useAlertStore()

  useFetch()
  usePageTrack()

  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    if (packStatus === 'failed') {
      setError({
        message: 'Unable to get your packs. Please refresh the page.',
      })
    }
  })

  return (
    <>
      {(status === 'idle' || status === 'loading') && !isPublic && (
        <LoadingScreen backgroundColor={'theme.palette.background.card'} />
      )}
      {(status === 'succeeded' || status === 'failed' || isPublic) && (
        <main className={classes.content}>
          {status === 'failed' && !isPublic && (
            <SomethingWentWrong
              backgroundColor={theme.palette.background.default}
              fontColor={'#555555'}
            />
          )}
          {(status === 'succeeded' || isPublic) && (
            <Box height="calc(100vh-48px)" mt="48px" overflow="hidden">
              {children}
            </Box>
          )}
        </main>
      )}
    </>
  )
}

export default AdminNav
