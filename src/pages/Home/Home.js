import { Container, Box, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="xs">
      <Box pt={10}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography align="center">
              <Link to="/login">Sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
