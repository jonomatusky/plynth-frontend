import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Box, TextField, CardActionArea } from '@mui/material'

import usePackStore from 'hooks/store/use-pack-store'
import Image from 'components/Image'
import PieceName from './PieceName'
import { VideoCameraBack } from '@mui/icons-material'

const PieceItem = ({ piece, isMobile }) => {
  const { updatePack } = usePackStore()

  const [name, setName] = useState('')

  useEffect(() => {
    setName(piece.name)
  }, [piece.name])

  const updateName = async () => {
    try {
      await updatePack({ id: piece.id, name: name })
    } catch (err) {}
  }

  const { imageUrl } = piece.cards[0]
  // const aspect =
  //   imageHeight / imageWidth === 1.5
  //     ? '2x3 (4"x6")'
  //     : imageWidth / imageHeight === 1.5
  //     ? '3x2 (6"x4")'
  //     : `${imageWidth}x${imageHeight}px`

  return (
    <Box display="flex" flexWrap="wrap" width="256px" height="300px" mr={4}>
      <Card>
        <CardActionArea
          sx={{ padding: '8px' }}
          component={Link}
          to={isMobile ? `/p/${piece.id}` : `/admin/pieces/${piece.id}/edit`}
          target={isMobile ? '_black' : null}
        >
          <Box
            height="240px"
            width="240px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box
              width="240px"
              height="240px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  style={{ maxHeight: '224px', maxWidth: '100%' }}
                />
              ) : (
                <VideoCameraBack
                  sx={{ fontSize: '128px', color: '#00000044' }}
                />
              )}
            </Box>
            {/* <Box
              width="100%"
              height="20px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="caption">{aspect}</Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  {videoDuration || ''} sec
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </CardActionArea>
      </Card>
      <PieceName
        text={name}
        placeholder="Your Piece"
        type="input"
        submit={updateName}
      >
        <TextField
          variant="standard"
          type="text"
          name="task"
          placeholder="Your Piece"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => updateName()}
          size="small"
          autoFocus={true}
        />
      </PieceName>
    </Box>
  )
}

export default PieceItem
