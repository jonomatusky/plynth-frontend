import React from 'react'
import { Dialog } from '@material-ui/core'

import ImageCropper from './ImageCropper'

const ImageCropDialog = ({
  imageUrl,
  isOpen,
  setIsOpen,
  onSubmit,
  round,
  resolution,
}) => {
  const closeDialog = () => {
    setIsOpen(false)
  }

  const submitHandler = ({ imageFilepath }) => {
    onSubmit(imageFilepath)
    closeDialog()
  }

  return (
    <Dialog fullScreen open={!!isOpen && !!imageUrl} onClose={closeDialog}>
      <ImageCropper
        round={round}
        imageSrc={imageUrl}
        onCancel={closeDialog}
        onSubmit={submitHandler}
        resolution={resolution}
      />
    </Dialog>
  )
}

export default ImageCropDialog
