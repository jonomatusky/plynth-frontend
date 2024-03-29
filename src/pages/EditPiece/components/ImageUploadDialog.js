import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
  Slider,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Upload,
  FilterFrames,
  Portrait,
  Close,
  Crop,
  Loop,
  CropPortrait,
  CropLandscape,
  CropSquare,
  CropOriginal,
  ArrowBackIos,
} from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRequest } from 'hooks/use-request'

const demoImageName = 'Postcard+Mixtape+Vol+1+600px.jpg'
const { REACT_APP_ASSET_URL } = process.env
const demourl = REACT_APP_ASSET_URL + '/' + demoImageName

const imageMinWidthDimension = 1200

const ImageUploadDialog = ({
  submitImage,
  imageUrl,
  videoUrl,
  videoDuration,
  open,
  onClose,
}) => {
  const [value, setValue] = useState(0)
  const [isReplacing, setIsReplacing] = useState(!imageUrl)

  const [image, setImage] = useState({
    filepath: null,
    width: null,
    height: null,
  })
  const [imageToCrop, setImageToCrop] = useState({
    src: null,
    width: null,
    height: null,
  })

  const imageSrc = image.filepath
    ? REACT_APP_ASSET_URL + '/' + image.filepath
    : null

  useEffect(() => {
    if (!imageUrl) {
      setIsReplacing(true)
    }
    setImage({})
    setImageToCrop({})
  }, [open, imageUrl])

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
    const onDrop = useCallback(acceptedFiles => {
      console.log('uploading file')

      acceptedFiles.forEach(file => {
        let imageSrc = URL.createObjectURL(file)

        const img = new Image()
        img.onload = function () {
          const height = this.height
          const width = this.width
          setImageToCrop({ src: imageSrc, width, height })
        }

        img.src = imageSrc
      })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      maxFiles: 1,
      accept: 'image/jpeg, image/jpg, image/png',
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
          <Box>
            <Upload color="secondary" sx={{ fontSize: 40 }} />
            <Typography>Drop here or click to select</Typography>
          </Box>
        </Button>
      </div>
    )
  }

  // const handleSelect = () => {
  //   console.log('selected')
  // }

  const handleSelectDemoImage = () => {
    const data = { filepath: demoImageName, width: 600, height: 900 }
    submitImage(data)
    setIsReplacing(false)
    onClose()
  }

  const handleClose = () => {
    setImage({})
    setImageToCrop({})
    setIsReplacing(false)
    onClose()
  }

  // const videoDuration = videoRef.current ? videoRef.current.duration : 0
  // const videoDuration = 75.512

  const videoRef = useRef()

  const TimeSlider = ({ onChange }) => {
    const [sliderValue, setSliderValue] = useState(0)

    const handleChangeTime = (e, value) => {
      console.log(value)
      setSliderValue(value)
      onChange(value)
    }

    console.log(videoDuration)

    return (
      <>
        {videoDuration && videoUrl && (
          <Slider
            value={sliderValue}
            onChange={handleChangeTime}
            min={0}
            max={Math.round(videoDuration * 30)}
            step={1}
          />
        )}
      </>
    )
  }

  const handleChangeTime = value => {
    if (videoRef.current) {
      videoRef.current.currentTime = value / 30
    }
  }

  const getFrame = () => {
    const video = document.getElementById('piece-video')
    const format = 'jpeg'
    const quality = 0.92

    var canvas = document.createElement('CANVAS')

    const width = video.videoWidth
    const height = video.videoHeight

    canvas.width = width
    canvas.height = height

    canvas.getContext('2d').drawImage(video, 0, 0)

    var dataUri = canvas.toDataURL('image/' + format, quality)

    setImageToCrop({ src: dataUri, width, height })

    canvas = null
  }

  const ContentUpload = () => {
    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Add an Image</Box>
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

            <OptionButton
              index={2}
              icon={FilterFrames}
              label="Choose frame from video"
              disabled={!videoUrl}
            />

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
                {value === 2 && (
                  <Box position="relative" height="100%" width="100%">
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      zIndex={10}
                      pl={2}
                      pr={2}
                      pt={1}
                      backgroundColor="#ffffff70"
                    >
                      <TimeSlider onChange={handleChangeTime} />
                    </Box>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <video
                        id="piece-video"
                        src={videoUrl}
                        crossOrigin="anonymous"
                        ref={videoRef}
                        style={{
                          maxWidth: '440px',
                          maxHeight: '360px',
                          objectFit: 'contain',
                        }}
                        muted
                        alt="Piece"
                      />
                    </Box>
                  </Box>
                )}
                {value === 3 && (
                  <img
                    src={demourl}
                    style={{
                      maxWidth: '440px',
                      maxHeight: '360px',
                      objectFit: 'contain',
                    }}
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
                disabled={!imageToCrop.src}
              >
                Next
              </Button>
            )}
            {value === 2 && (
              <Button variant="contained" onClick={getFrame}>
                Select Frame
              </Button>
            )}
            {value === 3 && (
              <Button variant="contained" onClick={handleSelectDemoImage}>
                Select
              </Button>
            )}
          </Box>
        </DialogActions>
      </>
    )
  }

  const ContentCropping = () => {
    const [crop, setCrop] = useState(() => {
      if (imageToCrop.height >= 1.5 * imageToCrop.width) {
        return { unit: '%', aspect: 2 / 3, width: 100, x: 0, y: 0 }
      } else if (imageToCrop.width >= 1.5 * imageToCrop.height) {
        return { unit: '%', aspect: 3 / 2, height: 100, x: 0, y: 0 }
      } else if (imageToCrop.height >= imageToCrop.width) {
        return { unit: '%', aspect: 2 / 3, height: 100, x: 0, y: 0 }
      } else {
        return { unit: '%', aspect: 3 / 2, width: 100, x: 0, y: 0 }
      }
    })

    const { request } = useRequest()

    const [status, setStatus] = useState('idle')

    console.log('status: ' + status)

    const [currentCrop, setCurrentCrop] = useState(
      imageToCrop.height >= imageToCrop.width ? 0 : 1
    )

    const [displayImageDimensions, setDisplayImageDimensions] = useState({
      width: null,
      height: null,
    })

    const submitCrop = async () => {
      setStatus('loading')
      const cropImage = () => {
        let cropScale = imageToCrop.width / displayImageDimensions.width

        let width = Math.round(cropScale * crop.width)
        let height = Math.round(cropScale * crop.height)
        let x = Math.round(cropScale * crop.x)
        let y = Math.round(cropScale * crop.y)

        let shortEdgeLength = Math.min(width, height)

        let endWidth = width
        let endHeight = height

        if (shortEdgeLength > imageMinWidthDimension) {
          let scale = imageMinWidthDimension / shortEdgeLength
          endWidth = Math.round(scale * width)
          endHeight = Math.round(scale * height)
        }

        return new Promise((resolve, reject) => {
          var img = new Image()

          const canvas = document.createElement('canvas')

          console.log(imageToCrop.src)
          console.log(endWidth)
          console.log(endHeight)

          canvas.width = endWidth
          canvas.height = endHeight

          var ctx = canvas.getContext('2d')

          img.onload = () => {
            ctx.drawImage(img, x, y, width, height, 0, 0, endWidth, endHeight)

            ctx.canvas.toBlob(
              blob => {
                console.log('image cropped')
                resolve({ imageFile: blob, width: endWidth, height: endHeight })
              },
              'image/jpeg',
              0.92
            )
          }
          img.onerror = () => {
            reject('error cropping image')
            console.log('there was an error cropping the image')
            setStatus('error')
          }
          img.src = imageToCrop.src
        })
      }

      try {
        let { imageFile, width, height } = await cropImage()

        let { signedUrl, imageFilepath } = await request({
          url: '/auth/sign-s3',
          method: 'POST',
          data: {
            fileName: imageFile.name,
            fileType: imageFile.type,
          },
        })

        await request({ url: signedUrl, method: 'PUT', data: imageFile })

        await submitImage({ filepath: imageFilepath, width, height })
        setImage({ filepath: imageFilepath, width, height })

        URL.revokeObjectURL(imageToCrop.src)
        setImageToCrop({})
        setIsReplacing(false)
      } catch (err) {
        console.log(err)
        setStatus('error')
      }
    }

    const handleChangeCrop = newCrop => {
      setCrop(newCrop)
    }

    const handleCropImageLoaded = image => {
      setDisplayImageDimensions({ width: image.width, height: image.height })
    }

    const handleCancelCrop = () => {
      setImageToCrop({})
    }

    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Crop Image</Box>
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
          <Box width="144px" pb={2} display="flex" flexDirection="column">
            <Typography textAlign="center" pb={1}>
              <b>Choose Crop:</b>
            </Typography>
            <Button
              color={currentCrop === 0 ? 'primary' : 'secondary'}
              fullWidth
              startIcon={<CropPortrait />}
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              onClick={() => {
                setCrop({
                  unit: '%',
                  aspect: 2 / 3,
                  width:
                    imageToCrop.width > (2 / 3) * imageToCrop.height
                      ? null
                      : 100,
                  height:
                    imageToCrop.width > (2 / 3) * imageToCrop.height
                      ? 100
                      : null,
                  x: 0,
                  y: 0,
                })
                setCurrentCrop(0)
              }}
            >
              2:3 (4" x 6")
            </Button>
            <Button
              color={currentCrop === 1 ? 'primary' : 'secondary'}
              startIcon={<CropLandscape />}
              fullWidth
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              onClick={() => {
                setCrop({
                  unit: '%',
                  aspect: 3 / 2,
                  width:
                    imageToCrop.width > (3 / 2) * imageToCrop.height
                      ? null
                      : 100,
                  height:
                    imageToCrop.width > (3 / 2) * imageToCrop.height
                      ? 100
                      : null,
                  x: 0,
                  y: 0,
                })
                setCurrentCrop(1)
              }}
            >
              3:2 (6" x 4")
            </Button>
            <Button
              color={currentCrop === 2 ? 'primary' : 'secondary'}
              startIcon={<CropSquare />}
              fullWidth
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              onClick={() => {
                setCrop({
                  unit: '%',
                  aspect: 1 / 1,
                  width: imageToCrop.width > imageToCrop.height ? null : 100,
                  height: imageToCrop.width > imageToCrop.height ? 100 : null,
                  x: 0,
                  y: 0,
                })
                setCurrentCrop(2)
              }}
              sx={{ textTransform: 'none' }}
            >
              1:1 (Square)
            </Button>
            <Button
              color={currentCrop === 3 ? 'primary' : 'secondary'}
              startIcon={<CropOriginal />}
              fullWidth
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              onClick={() => {
                setCrop({
                  unit: 'px',
                  width: displayImageDimensions.width,
                  height: displayImageDimensions.height,
                  x: 0,
                  y: 0,
                })
                setCurrentCrop(3)
              }}
              sx={{ textTransform: 'none' }}
            >
              Custom
            </Button>
            <Box flexGrow={1} />
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
                <ReactCrop
                  src={imageToCrop.src}
                  crop={crop}
                  onChange={handleChangeCrop}
                  onImageLoaded={handleCropImageLoaded}
                  imageStyle={{
                    maxWidth: '440px',
                    maxHeight: '360px',
                    objectFit: 'contain',
                  }}
                  style={{
                    maxWidth: '440px',
                    maxHeight: '360px',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box p1={1} pb={1}>
              <Button
                startIcon={<ArrowBackIos />}
                color="inherit"
                onClick={handleCancelCrop}
              >
                Back
              </Button>
            </Box>

            <Box pr={1} pb={1}>
              <LoadingButton
                variant="contained"
                onClick={submitCrop}
                loading={status === 'loading'}
              >
                Crop and Save
              </LoadingButton>
            </Box>
          </Box>
        </DialogActions>
      </>
    )
  }

  const handleReplace = () => {
    setIsReplacing(true)
    setImageToCrop({})
  }

  const ContentReplace = () => {
    return (
      <>
        <DialogTitle>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box>Current Image</Box>
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
              {(imageSrc || imageUrl) && (
                <img
                  src={imageSrc ? imageSrc : imageUrl}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  alt="Piece"
                />
              )}
            </Box>
          </Box>
        </Box>

        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Button
              color="secondary"
              endIcon={<Loop />}
              onClick={handleReplace}
              // sx={{
              //   backgroundColor: '#ffffff88',
              //   '&:hover': { backgroundColor: '#ffffff50' },
              // }}
              // onClick={replaceImage}
            >
              Replace
            </Button>
            <Button variant="contained" onClick={handleClose}>
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
          onClose()
        }
      }}
    >
      {!isReplacing ? (
        <ContentReplace />
      ) : !!imageToCrop.src ? (
        <ContentCropping />
      ) : (
        <ContentUpload />
      )}
    </Dialog>
  )
}

export default ImageUploadDialog
