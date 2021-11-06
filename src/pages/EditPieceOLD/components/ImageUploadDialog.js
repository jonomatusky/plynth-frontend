import React, { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
} from '@mui/material'
import {
  Upload,
  CameraAlt,
  FilterFrames,
  Portrait,
  Close,
  Crop,
  Loop,
  CropPortrait,
  CropLandscape,
  CropSquare,
  CropOriginal,
} from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getCroppedImg } from 'util/getCroppedImg'
import { useRequest } from 'hooks/use-request'

const ImageUploadDialog = ({ url, width, height, open, onClose }) => {
  const { request, status } = useRequest()
  const [value, setValue] = useState(0)

  const [image, setImage] = useState(url)
  const [imageDimensions, setImageDimensions] = useState({
    width,
    height,
  })
  const [isCropping, setIsCropping] = useState(false)
  const [crop, setCrop] = useState(() => {
    if (height >= 1.5 * width) {
      return { unit: '%', aspect: 2 / 3, width: 100, x: 0, y: 0 }
    } else if (width >= 1.5 * height) {
      return { unit: '%', aspect: 3 / 2, height: 100, x: 0, y: 0 }
    } else if (height >= width) {
      return { unit: '%', aspect: 2 / 3, height: 100, x: 0, y: 0 }
    } else {
      return { unit: '%', aspect: 3 / 2, width: 100, x: 0, y: 0 }
    }
  })
  const [currentCrop, setCurrentCrop] = useState(height >= width ? 0 : 1)

  const OptionButton = ({ index, icon, label }) => {
    const Icon = icon

    return (
      <Button onClick={() => setValue(index)} fullWidth>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Icon color={value === index ? 'primary' : 'secondary'} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              lineHeight={1}
              sx={{ textTransform: 'none' }}
              color={value === index ? 'primary' : 'secondary'}
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
      acceptedFiles.forEach(file => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result
          console.log(binaryStr)
        }
        reader.readAsArrayBuffer(file)
      })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      accept: 'image/jpeg, image/jpg, image/png',
    })

    return (
      <div {...getRootProps()} style={{ textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Upload color="secondary" sx={{ fontSize: 40 }} />
        <p>Drop here or click to select</p>
      </div>
    )
  }

  const submitCrop = async () => {
    let downloadedImage = new Image()
    try {
      const res = await request({ url: url })
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      downloadedImage.src = objectUrl
      const croppedImg = await getCroppedImg(downloadedImage, crop, 'image')

      setImage(croppedImg)
      setIsCropping(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = () => {
    onClose()
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
      <DialogTitle>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box>{url ? 'Edit Image' : 'Add an Image'}</Box>
          <Box>
            <Button
              endIcon={<Close />}
              onClick={onClose}
              variant="secondary"
              size="small"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      {url ? (
        <Box display="flex">
          <Box flexGrow={1}>
            <Box width="100%" pr={2} pb={2}>
              <Box
                height="400px"
                width="484px"
                backgroundColor="#00000010"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {isCropping ? (
                  <ReactCrop
                    src={image}
                    crop={crop}
                    onChange={newCrop => setCrop(newCrop)}
                    imageStyle={{
                      maxWidth: '484px',
                      maxHeight: '400px',
                      objectFit: 'contain',
                    }}
                    style={{
                      maxWidth: '484px',
                      maxHeight: '400px',
                    }}
                  />
                ) : (
                  <img
                    src={image}
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
        </Box>
      ) : (
        <>
          {isCropping && (
            <Box width="184px" pb={2} display="flex" flexDirection="column">
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
                    width: width > (2 / 3) * height ? null : 100,
                    height: width > (2 / 3) * height ? 100 : null,
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
                    width: width > (3 / 2) * height ? null : 100,
                    height: width > (3 / 2) * height ? 100 : null,
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
                    width: width > height ? null : 100,
                    height: width > height ? 100 : null,
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
                    unit: '%',
                    width: 100,
                    height: 100,
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

              <Box pr={2} pl={2}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<Crop />}
                  onClick={submitCrop}
                >
                  Crop
                </Button>
              </Box>
              <Box pr={1} pl={1}>
                <Button
                  fullWidth
                  onClick={() => setIsCropping(false)}
                  size="small"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
      <Box width="600px" height="400px">
        <Grid container width="100%">
          <Grid item xs={3} container justifyContent="center" spacing={1}>
            <Grid item xs={12}>
              <OptionButton index={0} icon={Upload} label="Upload" />
            </Grid>
            <Grid item xs={12}>
              <OptionButton index={1} icon={CameraAlt} label="Take a photo" />
            </Grid>
            <Grid item xs={12}>
              <OptionButton
                index={2}
                icon={FilterFrames}
                label="Choose frame from video"
              />
            </Grid>
            <Grid item xs={12}>
              <OptionButton index={3} icon={Portrait} label="Use one of ours" />
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Box width="100%" pr={2} pb={2}>
              <Box
                height="300px"
                borderRadius="3px"
                border={1}
                borderColor="#20262dbb"
                backgroundColor="#00000010"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FileUpload />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      )}
      <DialogActions>
        <Box pr={1} pb={1} endIcon={<Crop />}>
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={isCropping}
          >
            Done
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ImageUploadDialog
