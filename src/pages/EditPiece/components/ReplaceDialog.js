import React, { useState, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { Upload, Close, Loop } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/dist/ReactCrop.css'
import { getCroppedImg } from 'util/getCroppedImg'
import { useRequest } from 'hooks/use-request'

const ReplaceDialog = ({
  imageUrl,
  imageWidth,
  imageHeight,
  open,
  onClose,
}) => {
  const [value, setValue] = useState(0)

  const [image, setImage] = useState(imageUrl)

  const [isCropping, setIsCropping] = useState(false)

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
      const res = await request({ url: imageUrl })
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

  const replaceImage = () => {
    setImage(null)
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
          <Box>{imageUrl ? 'Edit Image' : 'Add an Image'}</Box>
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
              <img
                src={image}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                alt="Piece"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Button
            color="secondary"
            endIcon={<Loop />}
            fullWidth
            size="small"
            // sx={{
            //   backgroundColor: '#ffffff88',
            //   '&:hover': { backgroundColor: '#ffffff50' },
            // }}
            onClick={replaceImage}
          >
            Replace
          </Button>

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

export default ReplaceDialog
