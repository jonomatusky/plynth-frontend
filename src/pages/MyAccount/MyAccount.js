import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ArrowBackIos } from '@material-ui/icons'
import UserForm from 'components/UserForm'
import useUserStore from 'hooks/store/use-user-store'
import AdminNav from 'components/AdminNav'

const Home = () => {
  const { user, status, updateUser } = useUserStore()

  const handleSubmit = values => {
    updateUser({ ...values })
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
      <Container maxWidth="xs">
        <Box pt={7}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Box pb={4}>
                <Typography variant="h5" align="center">
                  Edit Your Account
                </Typography>
              </Box>
              {status === 'succeeded' && (
                <Paper>
                  <Box p={3}>
                    <Grid container justifyContent="center" spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Profile Info</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <UserForm
                          user={user}
                          onSubmit={handleSubmit}
                          submitLabel="Update"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AdminNav>
  )
}

export default Home
