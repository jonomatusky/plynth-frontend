import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'

import ImageCropper from './ImageCropper'
import ImagePicker from './ImagePicker'

const ImageUpload = ({ imageUrl: propImageUrl, onInput, children, round }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  // const [imageUrl, setImageUrl] = useState(null)

  const closeDialog = () => {
    setDialogIsOpen(false)
    setImageSrc(null)
  }

  const handleSelect = url => {
    console.log(url)
    setDialogIsOpen(true)
    setImageSrc(url)
  }

  const submitHandler = ({ imageFilepath }) => {
    // setImageUrl(imageUrl)
    onInput(imageFilepath)
    closeDialog()
  }

  // useEffect(() => {
  //   const setImage = () => {
  //     setImageUrl(propImageUrl)
  //   }
  //   setImage()
  // }, [setImageUrl, propImageUrl])

  return (
    <>
      <Dialog
        fullScreen
        open={!!dialogIsOpen && !!imageSrc}
        onClose={closeDialog}
      >
        <ImageCropper
          round={round}
          imageSrc={imageSrc}
          onCancel={closeDialog}
          onSubmit={submitHandler}
        />
      </Dialog>
      {/* <Dialog open={!!(dialogIsOpen && !imageSrc)} onClose={closeDialog}>
        <DialogTitle>"Change Profile Photo"</DialogTitle>
        <DialogContent
          dividers
        >{`Upload a new image to change your profile picture.`}</DialogContent>
        <DialogActions>
          <ActionButton
            fullWidth={true}
            variant="text"
            onClick={closeDialog}
            label="Close"
          />
          <ImagePicker onSelect={handleSelect}>
            <Button></Button>
          </ImagePicker>
        </DialogActions>
      </Dialog> */}
      <ImagePicker onSelect={handleSelect}>{children}</ImagePicker>
    </>
  )
}

export default ImageUpload
