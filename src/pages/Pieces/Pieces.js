import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'
import BarAccount from 'layouts/BarAccount'
import PieceItem from './components/PieceItem'

const Pieces = () => {
  const { packs } = usePackStore()

  const pieces = packs.filter(pack => {
    if ((pack.cards || []).length > 0 && pack.cards[0].type === 'ar') {
      return true
    } else {
      return false
    }
  })

  return (
    <>
      <BarAccount />
      <AdminNav>
        <Box height="calc(100vh - 48px)" overflow="hidden">
          <Container disableGutters maxWidth={false}>
            <Box display="flex" width="100%" flexWrap="wrap" padding={6}>
              <Box display="flex" flexWrap="wrap" width="256px" mr={4}>
                <Box
                  height="256px"
                  width="100%"
                  borderRadius="6px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    variant="outlined"
                    // color="secondary"
                    color="primary"
                    sx={{
                      height: '256px',
                      width: '100%',
                      // backgroundColor: '#00000033',
                      // ':hover': {
                      //   backgroundColor: '#00000066',
                      // },
                    }}
                    size="large"
                    // variant="contained"
                    disableElevation
                    component={Link}
                    to="/admin/pieces/new"
                  >
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignitems="center"
                      justifyContent="center"
                      width="100%"
                    >
                      <Box width="100%" textAlign="center">
                        <Add sx={{ fontSize: 48 }} />
                      </Box>

                      <Typography sx={{ textTransform: 'none' }}>
                        <b>Create New Piece</b>
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box width="100%" pt={1}>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                  ></Typography>
                </Box>
              </Box>
              {pieces.map(piece => {
                return <PieceItem piece={piece} key={piece.id} />
              })}
            </Box>
          </Container>
        </Box>
      </AdminNav>
    </>
  )
}

export default Pieces
