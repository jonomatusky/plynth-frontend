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
import { useRequest } from 'hooks/use-request'
import { set } from 'react-ga'

const demoName = 'astronaut-ar-trimmed.mp4'
const { REACT_APP_ASSET_URL } = process.env
const demoSrc = REACT_APP_ASSET_URL + '/' + demoName

const ImageUploadDialog = ({
  submit,
  videoUrl,
  videoDuration,
  open,
  onClose,
}) => {
  const [value, setValue] = useState(0)
  const [isReplacing, setIsReplacing] = useState(!videoUrl)

  useEffect(() => {
    setIsReplacing(!videoUrl)
  }, [videoUrl])

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

  console.log(isReplacing)
  console.log(videoUrl)

  const FileUpload = () => {
    const [videoLoading, setVideoLoading] = useState(false)
    const [error, setError] = useState()

    const { request } = useRequest()

    const handleDrop = () => {
      console.log('drop')
    }

    const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } =
      useDropzone({
        onDrop: handleDrop,
        multiple: false,
        accept: 'video/mp4,video/quicktime',
        maxSize: 104857600,
        maxFiles: 1,
      })

    let file = acceptedFiles[0] || {}
    console.log(file.name)
    console.log(file.type)

    let name = file.name

    if (file.type === 'video/quicktime') {
      name = file.name.substr(0, file.name.lastIndexOf('.')) + '.mp4'
    }

    const uploadFile = async () => {
      setVideoLoading(true)
      console.log('uploading')
      let { signedUrl, imageFilepath } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: name,
          fileType: file.type,
        },
        disabled: videoLoading,
      })

      console.log('requestion')

      try {
        await request({ url: signedUrl, method: 'PUT', data: file })

        await submit({ filepath: imageFilepath })
      } catch (err) {}

      setIsReplacing(false)
    }

    const File = () => {
      return (
        <Box padding={3}>
          <Typography>{file.name}</Typography>
        </Box>
      )
    }

    return (
      <Box display="flex" flexWrap="wrap" width="440px">
        <Box
          height="360px"
          width="100%"
          backgroundColor="#00000010"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
              ) : file.name ? (
                <File />
              ) : (
                <Box>
                  <Upload color="secondary" sx={{ fontSize: 40 }} />
                  {error ? (
                    <Typography>{error}</Typography>
                  ) : (
                    <>
                      <Typography>{`Upload a video.`}</Typography>
                      <Typography>{`Must be under 100MB and .mp4 or .mov`}</Typography>
                    </>
                  )}
                </Box>
              )}
            </Button>
          </div>
        </Box>
        <Box display="flex" justifyContent="flex-end" width="100%" pt={1}>
          <LoadingButton
            variant="contained"
            onClick={uploadFile}
            disabled={!file}
            loading={videoLoading}
          >
            Upload
          </LoadingButton>
        </Box>
      </Box>
    )
  }

  const handleSelectDemo = () => {
    try {
      const data = { filepath: demoName }
      submit(data)
      setIsReplacing(false)
    } catch (err) {}
  }

  const handleClose = () => {
    setIsReplacing(!videoUrl)
    onClose()
  }

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
              {value === 0 && <FileUpload />}
              {value === 1 && <FileUpload />}
              {value === 2 && <FileUpload />}
              {value === 3 && (
                <Box
                  height="360px"
                  width="440px"
                  backgroundColor="#00000010"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ReactPlayer
                    url={videoUrl}
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
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <DialogActions>
          <Box pr={1} pb={1} endIcon={<Crop />}>
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
    const [duration, setDuration] = useState()

    console.log(duration)
    console.log(videoDuration)

    const closeAndSetDuration = () => {
      if (duration !== videoDuration) {
        console.log('submitting duration')
        submit({ duration })
      }
      handleClose()
    }

    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Current Video</Box>
            <Box>
              <Button
                endIcon={<Close />}
                onClick={closeAndSetDuration}
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
                url={videoUrl}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onDuration={duration => {
                  setDuration(duration)
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
              onClick={() => setIsReplacing(true)}
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              // onClick={replaceImage}
            >
              Replace
            </Button>
            <Button
              variant="contained"
              onClick={closeAndSetDuration}
              disabled={!duration}
            >
              Done
            </Button>
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
          handleClose()
        }
      }}
    >
      {isReplacing ? <ContentUpload /> : <ContentReplace />}
    </Dialog>
  )
}

export default ImageUploadDialog
