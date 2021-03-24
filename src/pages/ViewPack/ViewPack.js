import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router'
import {} from 'hooks/store/use-pack-store'

const ViewPack = () => {
  const { packId } = useParams()

  const pack = selectPack(packId)

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
    </Container>
  )
}
