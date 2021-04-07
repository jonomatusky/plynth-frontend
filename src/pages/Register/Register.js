import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, Grid, Typography, Paper } from '@material-ui/core'

import UserForm from 'components/UserForm'
import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import PublicNav from 'layouts/PublicNav'

const Register = () => {
  const history = useHistory()
  const { user: authUser } = useSession()
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
              <Box pb={4}>
                <Typography variant="h5" align="center">
                  Create Your Account
                </Typography>
              </Box>

              <Paper>
                <Box p={3}>
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
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Register
