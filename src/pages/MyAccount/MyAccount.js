import { Container, Box, Grid, Paper, Typography } from '@material-ui/core'
import UserForm from 'components/UserForm'
import useUserStore from 'hooks/store/use-user-store'

const Home = () => {
  const { user, updateUser } = useUserStore()

  const handleSubmit = values => {
    updateUser({ id: user.id, ...values })
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

export default Home
