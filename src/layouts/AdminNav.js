import React, { useEffect } from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import {
  // Grid,
  // Box,
  // Menu,
  // MenuItem,
  Drawer,
  // IconButton,
  Toolbar,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material'
// import { Portrait } from '@mui/icons-material'
// import { Person, HelpOutline } from '@mui/icons-material'

import { useFetch } from 'hooks/use-fetch'
// import { useSession } from 'hooks/use-session'
// import logo from 'images/plynth_logo_simple.svg'
import usePageTrack from 'hooks/use-page-track'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useAlertStore from 'hooks/store/use-alert-store'
import usePackStore from 'hooks/store/use-pack-store'
import { Box } from '@mui/system'
import Image from 'components/Image'
import Logo from 'images/plynth_logo_color.svg'
import { Add } from '@mui/icons-material'

// import useAlertStore from 'hooks/store/use-alert-store'

export const drawerWidth = 240

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
  toolbar: theme.mixins.toolbar,
  // content: {
  //   flexGrow: 1,
  //   backgroundColor: '#fafafa',
  //   // paddingRight: theme.spacing(3),
  //   // paddingLeft: theme.spacing(3),
  // },
}))

const AdminNav = ({ isPublic, children }) => {
  const projects = [{ name: 'Example', id: '123456' }]

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

  const handleAddProject = () => {
    return
  }

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
            <Box display="flex">
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
              >
                <Toolbar>
                  <RouterLink to="/admin">
                    <Image src={Logo} height="24px" width="91px" />
                  </RouterLink>
                </Toolbar>
                <List sx={{ pb: 0 }}>
                  {/* <ListItem button component={RouterLink} to="/admin/home">
                    <ListItemText primary="Home" />
                  </ListItem> */}
                  <ListItemButton
                    component={NavLink}
                    to="/admin/home"
                    selected={true}
                    divider
                  >
                    <ListItemText primary="All Experiences" />
                  </ListItemButton>
                </List>
                <List>
                  <ListItem sx={{ pb: 0 }}>
                    <Typography
                      sx={{ textTransform: 'uppercase' }}
                      color="primary"
                      variant="overline"
                    >
                      <b>Projects</b>
                    </Typography>
                  </ListItem>
                  <ListItemButton
                    disableRipple
                    size="sm"
                    onClick={handleAddProject}
                  >
                    <ListItemIcon sx={{ minWidth: '32px' }}>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add Project" />
                  </ListItemButton>
                  {projects.map(project => {
                    return (
                      <ListItemButton
                        component={NavLink}
                        key={project.id}
                        to={`/projects/${project.id}`}
                      >
                        <ListItemText primary={project.name} />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Drawer>
              <Box
                height="calc(100vh-48px)"
                mt="48px"
                overflow="hidden"
                flexGrow="1"
              >
                {children}
              </Box>
            </Box>
          )}
        </main>
      )}
    </>
  )
}

export default AdminNav
