import React, { useState } from 'react'
import { Box, Grid, Typography, Button } from '@material-ui/core'

import { ArrowForward, Clear, AddAPhoto } from '@material-ui/icons'

import Image from 'components/Image'
import ImageUpload from 'components/ImageUpload'
import ButtonWebsite from 'components/ButtonWebsite'

const { REACT_APP_ASSET_URL } = process.env

const ImageUploadForm = ({ onSubmit }) => {
  const [imageSrc, setImageSrc] = useState()
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelect = async image => {
    console.log(image)
    setShowLoadingSpinner(false)
    setImageSrc(image)
  }

  const handleRemove = () => {
    setShowLoadingSpinner(false)
    setImageSrc(null)
  }

  const handleSubmit = imageSrc => {
    setIsLoading(false)
    onSubmit(imageSrc)
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
      {imageSrc && (
        <>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" justifyItems="center">
              <Image
                src={REACT_APP_ASSET_URL + '/' + imageSrc}
                width="200px"
                height="200px"
              />
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
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ButtonWebsite
              onClick={() => handleSubmit(imageSrc)}
              endIcon={<ArrowForward />}
              loading={isLoading}
            >
              Next: Add your content
            </ButtonWebsite>
          </Grid>
        </>
      )}
      {!imageSrc && (
        <Grid item xs={12}>
          <ImageUpload
            onSubmit={handleSelect}
            resolution={800}
            setIsPending={setShowLoadingSpinner}
          >
            <Box color="white" width="100%">
              <ButtonWebsite
                loading={showLoadingSpinner}
                endIcon={<AddAPhoto />}
              >
                Upload an Image
              </ButtonWebsite>
            </Box>
          </ImageUpload>
        </Grid>
      )}
    </Grid>
  )
}

export default ImageUploadForm
