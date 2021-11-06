import { AddPhotoAlternate, PlayArrow, VideoCall } from '@mui/icons-material'
import { Card, CardActionArea, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ReactPlayer from 'react-player'

import Image from './Image'

const MediaBlock = ({ imageSrc, videoSrc, mediaType, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Box display="flex" flexWrap="wrap" width="160px">
      <Card elevation={0} variant="outlined">
        <CardActionArea sx={{ padding: '8px' }} onClick={handleClick}>
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
              height="144px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box textAlign="center">
                {mediaType === 'image' ? (
                  <>
                    {imageSrc ? (
                      <>
                        <Box
                          width="144px"
                          height="144px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image
                            src={imageSrc}
                            style={{ maxHeight: '128px', maxWidth: '100%' }}
                          />
                        </Box>
                        {/* <Box
                      width="144px"
                      height="20px"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      overflow="hidden"
                    >
                      <Typography variant="caption">{aspect}</Typography>
                    </Box> */}
                      </>
                    ) : (
                      <>
                        <AddPhotoAlternate
                          sx={{ fontSize: 60 }}
                          color="primary"
                        />
                        <Typography
                          fontSize="large"
                          sx={{ textTransform: 'none' }}
                          color="primary"
                        >
                          <b>Add Image</b>
                        </Typography>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {videoSrc ? (
                      <>
                        <Box
                          width="144px"
                          height="144px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          position="relative"
                        >
                          <Box
                            width="100%"
                            height="100%"
                            zIndex={10}
                            color="white"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                          >
                            <PlayArrow color="inherit" fontSize="large" />
                          </Box>
                          <ReactPlayer
                            url={videoSrc}
                            muted
                            loop
                            style={{ maxHeight: '128px', maxWidth: '100%' }}
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <VideoCall sx={{ fontSize: 60 }} color="primary" />
                        <Typography
                          fontSize="large"
                          sx={{ textTransform: 'none' }}
                          color="primary"
                        >
                          <b>Add Video</b>
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default MediaBlock
