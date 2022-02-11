import React from 'react'

import { useRequest } from 'hooks/use-request'
import { useImageResize } from 'hooks/use-image-upload'
import ImagePicker from 'components/ImagePicker'

const ImageUpload = ({ onSubmit, resolution, children, setIsPending }) => {
  const resizeImage = useImageResize()
  // const { setError } = useAlertStore()
  const { request } = useRequest()

  const handleSubmit = async imageSrc => {
    if (setIsPending) {
      setIsPending(true)
    }

    let resizedImage

    try {
      resizedImage = await resizeImage(imageSrc, resolution || 600)
    } catch (err) {
      // setError({ message: err.message })
    }

    try {
      let { signedUrl, imageFilepath } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: resizedImage.name,
          fileType: resizedImage.type,
        },
      })

      await request({ url: signedUrl, method: 'PUT', data: resizedImage })

      onSubmit(imageFilepath)
    } catch (err) {}
  }

  return <ImagePicker onSelect={handleSubmit}>{children}</ImagePicker>
}

export default ImageUpload
