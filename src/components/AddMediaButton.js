import React, { useState, useEffect } from 'react'
import { Card, Box, Typography, CardActionArea } from '@mui/material'
import { AddAPhoto, AddPhotoAlternate, VideoCall } from '@mui/icons-material'

import ImageUploadDialog from './ImageUploadDialog'
import Image from 'components/Image'

const AddMediaButton = ({
  imageHeight,
  imageWidth,
  videoDuration,
  imageSrc,
  videoSrc,
  mediaType,
  updateMedia,
}) => {
  const aspect =
    imageHeight / imageWidth === 1.5
      ? '2x3 (4"x6")'
      : imageWidth / imageHeight === 1.5
      ? '3x2 (6"x4")'
      : imageSrc
      ? `${imageWidth}x${imageHeight}px`
      : ''

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const submitImage = image => {
    console.log(image)
    updateMedia({
      imageSrc: image.src,
      imageFile: image.file,
      imageHeight: image.height,
      imageWidth: image.width,
    })
  }

  return (
    <>
      <ImageUploadDialog
        open={open}
        imageUrl={imageSrc}
        videoUrl={videoSrc}
        width={imageWidth}
        height={imageHeight}
        submitImage={submitImage}
        onClose={handleClose}
      />

      <Box display="flex" flexWrap="wrap" width="160px">
        <Card elevation={0} variant="outlined">
          <CardActionArea sx={{ padding: '8px' }} onClick={handleOpen}>
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
                            height="124px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Image
                              src={imageSrc}
                              style={{ maxHeight: '108px', maxWidth: '100%' }}
                            />
                          </Box>
                          <Box
                            width="144px"
                            height="20px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            overflow="hidden"
                          >
                            <Typography variant="caption">{aspect}</Typography>
                          </Box>
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
                            height="124px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <video
                              src={videoSrc}
                              style={{ maxHeight: '108px', maxWidth: '100%' }}
                            />
                          </Box>
                          <Box
                            width="144px"
                            height="20px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            overflow="hidden"
                          >
                            <Typography variant="caption">
                              {!!videoDuration ? `${videoDuration}sec` : ''}
                            </Typography>
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
    </>
  )
}

export default AddMediaButton
