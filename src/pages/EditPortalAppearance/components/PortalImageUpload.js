import React, { useState, useEffect } from 'react'
import { Button, Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Clear } from '@mui/icons-material'
import ImageCropDialog from 'components/ImageCropDialog'
import ButtonUploadImage from 'components/ButtonUploadImage'
import ImagePicker from 'components/ImagePicker'
import ImageUpload from 'components/ImageUpload'

const Image = styled('img')(props => ({
  width: `150px`,
  height: `150px`,
}))

const PortalImageUpload = ({ portal, crop, pending, onSubmit }) => {
  const [cropDialogIsOpen, setCropDialogIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState()
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(pending)

  const { image, imageUrl } = portal || {}

  const handleAdd = async newImage => {
    await onSubmit({ image: newImage })
  }

  const handleRemove = async event => {
    await onSubmit({ image: null })
  }

  const handleSelect = url => {
    setCropDialogIsOpen(true)
    setImageSrc(url)
  }

  useEffect(() => {
    if (pending === false) {
      setShowLoadingSpinner(false)
    }
  }, [pending])

  return (
    <>
      <ImageCropDialog
        isOpen={cropDialogIsOpen}
        setIsOpen={setCropDialogIsOpen}
        imageUrl={imageSrc}
        onSubmit={handleAdd}
      />
      {!showLoadingSpinner && image && <Image src={imageUrl} />}
      {!showLoadingSpinner && !image && crop && (
        <ImagePicker onSelect={handleSelect}>
          <ButtonUploadImage />
        </ImagePicker>
      )}
      {!showLoadingSpinner && !image && !crop && (
        <ImageUpload
          onSubmit={handleAdd}
          resolution={800}
          setIsPending={setShowLoadingSpinner}
        >
          <ButtonUploadImage />
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
      {image && (
        <Box width="150px">
          <Button
            onClick={handleRemove}
            size="small"
            endIcon={<Clear />}
            fullWidth
          >
            Remove
          </Button>
        </Box>
      )}
      {!image && <Box height="30px" />}
    </>
  )
}

export default PortalImageUpload
