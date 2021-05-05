import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core'

import UserForm from 'components/UserForm'
import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import PublicNav from 'layouts/PublicNav'

const Register = () => {
  const history = useHistory()
  const { user: authUser, logout } = useSession()
  const { user } = useUserStore()
  const { createUser, createStatus, fetchUser } = useUserStore()

  const handleSubmit = async values => {
    values.email = authUser.email
    values.fid = authUser.uid

    console.log(values)

    await createUser(values)
    fetchUser()
  }

  useEffect(() => {
    if (user.id) {
      history.push('/admin')
    }
  }, [history, user])

  return (
    <PublicNav>
      <Container maxWidth="xs">
        <Box pt={10}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Box pb={1}>
                <Typography variant="h5" align="center">
                  Account Info
                </Typography>
              </Box>
              <Box pb={4}>
                <Typography align="center">
                  Please choose a display name and username to finish setting up
                  your account.
                </Typography>
              </Box>

              <Paper>
                <Box p={4}>
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <UserForm
                        onSubmit={handleSubmit}
                        submitLabel="Create Account"
                        pending={createStatus === 'loading'}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Box>
                <Button onClick={logout} color="secondary">
                  Cancel X
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Register
