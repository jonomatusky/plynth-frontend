import React, { useState } from 'react'
import { Button, Box, CircularProgress } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Clear } from '@material-ui/icons'
import ImageCropDialog from 'components/ImageCropDialog'
import ButtonUploadImage from 'components/ButtonUploadImage'
import ImagePicker from 'components/ImagePicker'

const Image = styled('div')(props => ({
  background: `url(${props.image}) no-repeat center`,
  backgroundSize: `contain`,
  textAlign: `center`,
  width: `150px`,
  height: `150px`,
}))

const CardImage = ({ card, onSubmit }) => {
  const [pending, setPending] = useState(false)
  const [cropDialogIsOpen, setCropDialogIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState()

  const { image, imageUrl } = card || {}

  const handleAdd = async newImage => {
    setPending(true)
    await onSubmit({ id: card.id, image: newImage })
    setPending(false)
  }

  const handleRemove = async event => {
    setPending(true)
    await onSubmit({ id: card.id, image: null })
    setPending(false)
  }

  const handleSelect = url => {
    setCropDialogIsOpen(true)
    setImageSrc(url)
  }

  return (
    <>
      <ImageCropDialog
        isOpen={cropDialogIsOpen}
        setIsOpen={setCropDialogIsOpen}
        imageUrl={imageSrc}
        onSubmit={handleAdd}
      />
      {!pending && image && <Image image={imageUrl} />}
      {!pending && !image && (
        <ImagePicker onSelect={handleSelect}>
          <ButtonUploadImage />
        </ImagePicker>
      )}
      {pending && (
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
        <Button
          onClick={handleRemove}
          size="small"
          endIcon={<Clear />}
          fullWidth
        >
          Remove
        </Button>
      )}
      {!image && <Box height="30px" />}
    </>
  )
}

export default CardImage
