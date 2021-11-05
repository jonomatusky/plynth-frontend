import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import { Upload, Portrait, Close, Crop, Loop } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/dist/ReactCrop.css'
import ReactPlayer from 'react-player'
import LoadingButton from '@mui/lab/LoadingButton'

const demoName = 'astronaut-ar-trimmed.mp4'
const { REACT_APP_ASSET_URL } = process.env
const demoUrl = REACT_APP_ASSET_URL + '/' + demoName

const ImageUploadDialog = ({ submit, url, videoUrl, open, onClose }) => {
  const [value, setValue] = useState(0)

  // const [image, setImage] = useState({ url: url })

  const [video, setVideo] = useState({
    src: null,
    file: null,
    duration: null,
  })

  useEffect(() => {
    if (open) {
      setVideo({ src: videoUrl })
    }
  }, [open, videoUrl])

  const OptionButton = ({ index, icon, label, disabled }) => {
    const Icon = icon

    return (
      <Button
        onClick={() => setValue(index)}
        fullWidth
        disabled={disabled}
        color={value === index ? 'primary' : 'secondary'}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Icon />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              lineHeight={1}
              sx={{ textTransform: 'none' }}
            >
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    )
  }

  const FileUpload = () => {
    const [videoLoading, setVideoLoading] = useState(false)
    const [error, setError] = useState()

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      setVideoLoading(true)
      rejectedFiles.forEach(file => {
        file.errors.forEach(err => {
          if (err.code === 'file-too-large') {
            setError(`Please upload a file that's 100MB or less`)
          }

          if (err.code === 'file-invalid-type') {
            setError(`Please upload a valid video file (.mp4)`)
          }
        })
      })
      acceptedFiles.forEach(file => {
        let videoSrc
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          videoSrc = reader.result
          setVideo({ src: videoSrc, file: acceptedFiles })
        }
        reader.readAsDataURL(file)
      })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      accept: 'video/mp4',
      maxSize: 100000000,
      maxFiles: 1,
    })

    return (
      <div
        {...getRootProps()}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <input {...getInputProps()} />
        <Button
          color="secondary"
          sx={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textTransform: 'none',
          }}
        >
          {videoLoading ? (
            <Box>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Box>
              <Upload color="secondary" sx={{ fontSize: 40 }} />
              {error ? (
                <Typography>{error}</Typography>
              ) : (
                <>
                  <Typography>{`Upload a video.`}</Typography>
                  <Typography>{`Video must be an .mp4`}</Typography>
                </>
              )}
            </Box>
          )}
        </Button>
      </div>
    )
  }

  const handleSelectDemo = () => {
    const data = { src: demoUrl, demo: true }
    submit(data)
    onClose()
  }

  const handleClose = () => {
    setVideo({ src: url })
    onClose()
  }

  console.log('reloading')

  const ContentUpload = () => {
    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Add a Video</Box>
            <Box>
              <Button
                endIcon={<Close />}
                onClick={handleClose}
                variant="secondary"
                size="small"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogTitle>

        <Box width="100%" display="flex">
          <Box
            width="144px"
            pb={2}
            display="flex"
            flexDirection="column"
            color=""
          >
            <OptionButton index={0} icon={Upload} label="Upload" />

            {/* <OptionButton index={1} icon={CameraAlt} label="Take a photo" /> */}

            {/* <OptionButton
              index={2}
              icon={FilterFrames}
              label="Choose frame from video"
              disabled={!videoUrl}
            /> */}

            <OptionButton index={3} icon={Portrait} label="Use one of ours" />
          </Box>
          <Box flexGrow={1}>
            <Box width="100%" pr={2} pb={2}>
              <Box
                height="360px"
                width="440px"
                backgroundColor="#00000010"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {value === 0 && (
                  <>
                    <FileUpload />
                  </>
                )}
                {value === 1 && <FileUpload />}
                {value === 2 && <FileUpload />}
                {value === 3 && (
                  <ReactPlayer
                    url={demoUrl}
                    style={{
                      maxWidth: '440px',
                      maxHeight: '360px',
                      objectFit: 'contain',
                    }}
                    muted
                    autoPlay
                    loop
                    alt="Piece"
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <DialogActions>
          <Box pr={1} pb={1} endIcon={<Crop />}>
            {value === 0 && (
              <Button
                variant="contained"
                // onClick={handleSelect}
                disabled={!video.src}
              >
                Next
              </Button>
            )}
            {value === 1 && (
              <Button variant="contained" onClick={handleSelectDemo}>
                Select
              </Button>
            )}
            {value === 3 && (
              <Button variant="contained" onClick={handleSelectDemo}>
                Select
              </Button>
            )}
          </Box>
        </DialogActions>
      </>
    )
  }

  const ContentReplace = () => {
    const [videoDuration, setVideoDuration] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () => {
      setIsSubmitting(true)
      onClose()
      submit({ ...video, duration: videoDuration })
    }

    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Current Video</Box>
            <Box>
              <Button
                endIcon={<Close />}
                onClick={handleClose}
                variant="secondary"
                size="small"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <Box width="100%" display="flex">
          <Box width="100%" pr={2} pb={2} pl={2}>
            <Box
              height="360px"
              width="568px"
              backgroundColor="#00000010"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ReactPlayer
                url={video.src}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onDuration={duration => {
                  setVideoDuration(duration)
                }}
                muted
                autoPlay
                loop
                alt="Uploaded"
              />
            </Box>
          </Box>
        </Box>

        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Button
              color="secondary"
              endIcon={<Loop />}
              onClick={() => setVideo({})}
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              // onClick={replaceImage}
            >
              Replace
            </Button>
            {!!url && !video.src ? (
              <Button variant="contained" onClick={handleClose}>
                Done
              </Button>
            ) : (
              <LoadingButton
                variant="contained"
                onClick={handleSubmit}
                loading={!videoDuration}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </DialogActions>
      </>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
    >
      {!!video.src ? <ContentReplace /> : <ContentUpload />}
    </Dialog>
  )
}

export default ImageUploadDialog
