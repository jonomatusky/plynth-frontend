import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Box, Typography, CardActionArea } from '@mui/material'

import Image from 'components/Image'

const AddMediaButton = ({ piece, mediaType }) => {
  const { imageHeight, imageWidth, videoDuration, imageUrl } = piece.cards[0]
  const aspect =
    imageHeight / imageWidth === 1.5
      ? '2x3 (4"x6")'
      : imageWidth / imageHeight === 1.5
      ? '3x2 (6"x4")'
      : `${imageWidth}x${imageHeight}px`

  return (
    <Box display="flex" flexWrap="wrap" width="160px">
      <Card elevation={0} variant="outlined">
        <CardActionArea
          sx={{ padding: '8px' }}
          component={Link}
          to={`/admin/pieces/${piece.id}/edit`}
        >
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
    </Box>
  )
}

export default AddMediaButton
