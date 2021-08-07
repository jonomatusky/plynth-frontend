import React, { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core'

import { ArrowForward, Clear } from '@material-ui/icons'

import Image from 'components/Image'
import ButtonUploadImage from 'components/ButtonUploadImage'
import ImageUpload from 'components/ImageUpload'

const { REACT_APP_ASSET_URL } = process.env

const ImageUploadForm = ({ onSubmit, setStatus }) => {
  const [imageSrc, setImageSrc] = useState()
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

  const handleSelect = async image => {
    console.log(image)
    setShowLoadingSpinner(false)
    setImageSrc(image)
  }

  const handleRemove = () => {
    setShowLoadingSpinner(false)
    setImageSrc(null)
  }

  return (
    <Grid container>
      <Grid item xs={12} mb={2}>
        <Typography variant="h4" color="white">
          <b>Upload an image</b>
        </Typography>
      </Grid>
      <Grid item xs={12} mb={4}>
        <Typography color="white">
          Choose which image you want your viewers to scan. It should be
          something you have in the real world–artwork, a t-shirt, a logo, a
          photo, etc.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          {!showLoadingSpinner && imageSrc && (
            <Box width="100%">
              <Image src={REACT_APP_ASSET_URL + '/' + imageSrc} width="100%" />
            </Box>
          )}
          {!showLoadingSpinner && !imageSrc && (
            <ImageUpload
              onSubmit={handleSelect}
              resolution={800}
              setIsPending={setShowLoadingSpinner}
            >
              <Box color="white">
                <ButtonUploadImage color="inherit" />
              </Box>
            </ImageUpload>
          )}
          {showLoadingSpinner && (
            <Box
              height="150px"
              width="150px"
              bgcolor="action.selected"
              display="flex"
              justifyItems="center"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          maxWidth="100%"
          height="100%"
          pb={3}
        >
          {imageSrc && (
            <Box width="150px">
              <Button
                onClick={handleRemove}
                size="small"
                endIcon={<Clear />}
                type="button"
                fullWidth
              >
                Remove
              </Button>
            </Box>
          )}
          {!imageSrc && <Box height="30px" />}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={!imageSrc}
          onClick={() => onSubmit(imageSrc)}
          variant="contained"
          endIcon={<ArrowForward />}
          size="large"
          fullWidth
          sx={{ height: '51.5px' }}
        >
          <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
            Next: Add your content
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default ImageUploadForm
