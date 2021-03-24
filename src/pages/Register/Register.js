import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, Grid, Typography, Paper } from '@material-ui/core'

import { AuthContext } from 'contexts/auth-context'
import UserForm from 'components/UserForm'
import useUserStore from 'hooks/store/use-user-store'

const Register = () => {
  const history = useHistory()
  const { authUser } = useContext(AuthContext)
  const { createUser, user } = useUserStore()

  const handleSubmit = values => {
    values.email = authUser.email
    values.fid = authUser.uid

    console.log(values)

    createUser(values)
  }

  if (user.id) {
    history.push('/admin')
  }

  return (
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
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register
