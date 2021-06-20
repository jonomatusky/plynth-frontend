import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ArrowBackIos } from '@material-ui/icons'
import UserForm from 'components/UserForm'
import AdminNav from 'layouts/AdminNav'
import { useSession } from 'hooks/use-session'
import { useState } from 'react'
import FormEmail from './components/FormEmail'
import firebase from 'config/firebase'
import useAlertStore from 'hooks/store/use-alert-store'

const MyAccount = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  const [passwordResetSent, setPaswordResetSent] = useState(false)

  const handleResetEmail = async () => {
    setPaswordResetSent(true)
    try {
      await firebase.auth().sendPasswordResetEmail(user.email)
    } catch (err) {
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  return (
    <AdminNav>
      <Grid container>
        <Grid item>
          <Box margin={2}>
            <IconButton component={Link} to="/admin" color="secondary">
              <ArrowBackIos />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box pt={5}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <Box pb={1}>
                    <Typography variant="h5" align="center">
                      <b>My Account</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Email</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormEmail />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Password</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Box p={3}>
                      {!passwordResetSent && (
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ height: '38px' }}
                          onClick={handleResetEmail}
                        >
                          Reset Password
                        </Button>
                      )}
                      {passwordResetSent && (
                        <Box minHeight="38px">
                          <Typography variant="subtitle2">
                            We've emailed you a link to reset your password.
                            Didn't receive an email? Check your junk folder or
                            request another link.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AdminNav>
  )
}

export default MyAccount
