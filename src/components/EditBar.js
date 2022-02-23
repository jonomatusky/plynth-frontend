import React from 'react'
import {
  AppBar,
  Divider,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { ChevronLeft } from '@mui/icons-material'

const EditBar = () => {
  // const [isSaving, setIsSaving] = useState(false)

  const location = useLocation()
  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  // const handleSave = () => {
  //   setIsSaving(true)
  // }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box mr={1} display="flex" flexWrap="nowrap">
            <Button
              startIcon={<ChevronLeft />}
              // onClick={handleSave}
              disableElevation
              component={Link}
              to={'/admin/home'}
              sx={{ minWidth: '120px' }}
              disableRipple
              disableFocusRipple
            >
              <Typography variant="body2">Home</Typography>
            </Button>

            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              // onChange={handleChange}
            >
              <Tab
                label={<Typography variant="body2">Elements</Typography>}
                component={RouterLink}
                to="elements"
                value="elements"
                sx={{ minWidth: '120px' }}
              />
              <Tab
                label={<Typography variant="body2">Appearance</Typography>}
                component={RouterLink}
                to="appearance"
                value="appearance"
                sx={{ minWidth: '120px' }}
              />

              <Tab
                component={RouterLink}
                to="settings"
                value="settings"
                sx={{ minWidth: '120px' }}
                label={<Typography variant="body2">Settings</Typography>}
              />
            </Tabs>
          </Box>
          <Box pr={1} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button variant="contained" color="secondary" disableElevation>
              Preview
            </Button>
          </Box>
        </Box>
        <Divider />
      </AppBar>
    </>
  )
}

export default EditBar
