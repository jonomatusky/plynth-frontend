import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import {
  Grid,
  AppBar,
  Toolbar,
  Slider,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useRequest } from 'hooks/use-request'
import { useImageResize } from 'hooks/use-image-upload'
// import { useAlertStore } from 'hooks/store/use-alert-store'

import './react-easy-crop.css'
import Button from './Button'

const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone
}

const useStyles = makeStyles(theme => ({
  topBar: {
    background: theme.palette.background.default,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  bottomBar: {
    top: 'auto',
    bottom: 0,
    background: theme.palette.background.default,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: isInStandaloneMode() ? theme.spacing(4) : theme.spacing(1),
    elevation: 0.0,
  },
}))

const ImageCropper = ({ imageSrc, resolution, onSubmit, onCancel, round }) => {
  const classes = useStyles()
  const resizeImage = useImageResize()
  // const { setError } = useAlertStore()
  const { status, request } = useRequest()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const submitHandler = async event => {
    let resizedImage

    try {
      resizedImage = await resizeImage(
        imageSrc,
        resolution || 600,
        croppedAreaPixels
      )
    } catch (err) {
      // setError({ message: err.message })
    }

    try {
      let { signedUrl, imageFilepath, imageUrl } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: resizedImage.name,
          fileType: resizedImage.type,
        },
      })

      await request({ url: signedUrl, method: 'PUT', data: resizedImage })

      onSubmit({ imageUrl, imageFilepath })
    } catch (err) {}
  }

  return (
    <>
      <AppBar className={classes.bottomBar}>
        <Toolbar>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Slider
                color="primary"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Grid>
            <Grid item xs={12} container spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button onClick={onCancel} variant="text">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={submitHandler} pending={status === 'loading'}>
                  Accept
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {!imageSrc ? (
        <CircularProgress />
      ) : (
        <div>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape={round ? 'round' : 'rect'}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            disableAutomaticStylesInjection={true}
          />
        </div>
      )}
    </>
  )
}

export default ImageCropper
