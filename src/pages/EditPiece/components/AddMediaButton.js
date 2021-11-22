import React, { useEffect, useRef } from 'react'
import { Card, Box, Typography, CardActionArea } from '@mui/material'
import { AddPhotoAlternate, VideoCall, PlayArrow } from '@mui/icons-material'
import ReactPlayer from 'react-player'

// import ImageUploadDialog from './ImageUploadDialog'
// import VideoUploadDialog from './VideoUploadDialog'
import Image from 'components/Image'
import OnboardingTooltip from 'components/OnboardingTooltip'

const AddMediaButton = ({
  imageHeight,
  imageWidth,
  videoDuration,
  imageSrc,
  videoSrc,
  mediaType,
  updateMedia,
  disabled,
  showTooltips,
  handleClick,
}) => {
  // const aspect =
  //   imageHeight / imageWidth === 1.5
  //     ? '2x3 (4"x6")'
  //     : imageWidth / imageHeight === 1.5
  //     ? '3x2 (6"x4")'
  //     : imageSrc
  //     ? `${imageWidth}x${imageHeight}px`
  //     : ''

  // const [open, setOpen] = useState(false)

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const submitImage = ({ filepath, height, width }) => {
  //   updateMedia({
  //     image: filepath,
  //     imageHeight: height,
  //     imageWidth: width,
  //   })
  // }

  // const submitVideo = ({ filepath, duration, height, width }) => {
  //   let media = {}
  //   if (filepath) {
  //     media.video = filepath
  //   }
  //   if (duration || height || width) {
  //     media.videoDuration = duration
  //     media.videoWidth = width
  //     media.videoHeight = height
  //   }
  //   updateMedia(media)
  // }

  const playerRef = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        playerRef.current.seekTo(0)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <>
      {/* {mediaType === 'image' ? (
        <ImageUploadDialog
          open={open}
          imageUrl={imageSrc}
          videoUrl={videoSrc}
          videoDuration={videoDuration}
          width={imageWidth}
          height={imageHeight}
          submitImage={submitImage}
          onClose={handleClose}
        />
      ) : (
        <VideoUploadDialog
          open={open}
          videoUrl={videoSrc}
          videoDuration={videoDuration}
          submit={submitVideo}
          onClose={handleClose}
        />
      )} */}
      <OnboardingTooltip
        open={showTooltips && (mediaType === 'video' ? !videoSrc : !imageSrc)}
        title={
          mediaType === 'image'
            ? 'Add an image. Don’t have one? Choose a frame from your video, or try it out with our demo image.'
            : "Upload a video. Don't have one? Use our demo video."
        }
        position="bottom"
      >
        <Box display="flex" flexWrap="wrap" width="160px" mt={1}>
          <Card elevation={0} variant="outlined">
            <CardActionArea
              sx={{ padding: '8px' }}
              onClick={handleClick}
              disabled={disabled}
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
                                ref={playerRef}
                                url={videoSrc}
                                muted
                                loop
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
                            <Typography variant="caption">
                              {!!videoDuration ? `${videoDuration}sec` : ''}
                            </Typography>
                          </Box> */}
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
      </OnboardingTooltip>
    </>
  )
}

export default AddMediaButton
