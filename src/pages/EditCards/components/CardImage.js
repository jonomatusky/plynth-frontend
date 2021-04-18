import React, { useState } from 'react'
import { Button, Box, CircularProgress } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Clear } from '@material-ui/icons'
import ImageUpload from 'components/ImageUpload'
import ButtonUploadImage from 'components/ButtonUploadImage'

const Image = styled('div')(props => ({
  background: `url(${props.image}) no-repeat center`,
  backgroundSize: `contain`,
  textAlign: `center`,
  width: `200px`,
  height: `200px`,
}))

const CardImage = ({ card, onSubmit }) => {
  const [pending, setPending] = useState(false)
  const { image, imageUrl } = card || {}

  const handleAdd = async newImage => {
    console.log(newImage)
    setPending(true)
    await onSubmit({ id: card.id, image: newImage })
    setPending(false)
  }

  const handleRemove = async event => {
    setPending(true)
    await onSubmit({ id: card.id, image: null })
    setPending(false)
  }

  return (
    <>
      {!pending && image && <Image image={imageUrl} />}
      {!pending && !image && (
        <ImageUpload onInput={handleAdd}>
          <ButtonUploadImage />
        </ImageUpload>
      )}
      {pending && (
        <Box
          height="200px"
          width="200px"
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
      {!image && <Box height="30px"></Box>}
    </>
  )
}

export default CardImage
