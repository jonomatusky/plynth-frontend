import React, { useState, useEffect } from 'react'
import { Card, Box, Typography, TextField, CardActionArea } from '@mui/material'

import usePackStore from 'hooks/store/use-pack-store'
import Image from 'components/Image'
import PieceName from './PieceName'

const PieceItem = ({ piece }) => {
  const { updatePack } = usePackStore()

  const [name, setName] = useState('')

  useEffect(() => {
    setName(piece.name)
  }, [piece.name])

  const updateName = async () => {
    console.log('submitting')
    try {
      await updatePack({ id: piece.id, name: name })
    } catch (err) {
      console.log(err)
    }
  }

  const { imageHeight, imageWidth, videoDuration, imageUrl } = piece.cards[0]
  const aspect =
    imageHeight / imageWidth === 1.5
      ? '2x3 (4"x6")'
      : imageWidth / imageHeight === 1.5
      ? '3x2 (6"x4")'
      : `${imageWidth}x${imageHeight}px`

  return (
    <Box display="flex" flexWrap="wrap" width="160px" mr={4}>
      <Card>
        <CardActionArea sx={{ padding: '8px' }}>
          <Box
            height="144px"
            width="144px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box
              width="144px"
              height="124px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={imageUrl}
                style={{ maxHeight: '108px', maxWidth: '100%' }}
              />
            </Box>
            <Box
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
            </Box>
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
