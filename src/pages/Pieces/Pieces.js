import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'

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
    <AdminNav>
      <BarAccount>
        <Box height="calc(100vh - 48px)" overflow="hidden">
          <Container disableGutters maxWidth={false}>
            <Box display="flex" width="100%" flexWrap="wrap" padding={6}>
              <Box display="flex" flexWrap="wrap" width="160px" mr={4}>
                <Box
                  height="160px"
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
                      height: '160px',
                      width: '100%',
                      // backgroundColor: '#00000033',
                      // ':hover': {
                      //   backgroundColor: '#00000066',
                      // },
                    }}
                    size="large"
                    // variant="contained"
                    disableElevation
                  >
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignitems="center"
                      justifyContent="center"
                      width="100%"
                    >
                      <Add sx={{ fontSize: 40 }} />

                      <Typography
                        fontSize="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Create New Piece
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
      </BarAccount>
    </AdminNav>
  )
}

export default Pieces
