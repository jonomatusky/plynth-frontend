import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'
import BarAccount from 'layouts/BarAccount'
import PieceItem from './components/PieceItem'

const Pieces = () => {
  const { packs, createPack } = usePackStore()

  const pieces = packs.filter(pack => {
    if ((pack.cards || []).length > 0 && pack.cards[0].type === 'ar') {
      return true
    } else {
      return false
    }
  })

  const createExperience = async () => {
    await createPack({
      name: 'My New Pack',
      style: { backgroundColor: '#FFF9F0', fontColor: '#333333' },
      isPublic: false,
      shareWithLink: true,
      cards: [
        {
          type: 'ar',
        },
      ],
    })
  }

  return (
    <>
      <BarAccount />
      <AdminNav>
        <Box height="calc(100vh - 48px)" overflow="hidden">
          <Container disableGutters maxWidth={false}>
            <Box
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              width="100%"
              flexWrap="wrap"
              padding={6}
            >
              <Box display="flex" flexWrap="wrap" width="256px" mr={4}>
                <Box
                  height="256px"
                  width="100%"
                  borderRadius="6px"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
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
                    onClick={createExperience}
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
                        <b>Create New Experience</b>
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
              {pieces.map(piece => {
                return <PieceItem piece={piece} key={piece.id} />
              })}
            </Box>

            <Box
              width="100%"
              flexWrap="wrap"
              padding={3}
              justifyContent="center"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <Typography textAlign="center" pb={1}>
                Switch over to desktop to create new experiences, or test your
                existing experiences below:
              </Typography>

              {pieces.map(piece => {
                return <PieceItem piece={piece} key={piece.id} isMobile />
              })}
            </Box>
          </Container>
        </Box>
      </AdminNav>
    </>
  )
}

export default Pieces
