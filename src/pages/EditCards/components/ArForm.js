import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { Link as LinkIcon } from '@mui/icons-material'
import { isMobile, isTablet } from 'react-device-detect'

import usePackStore from 'hooks/store/use-pack-store'

import AddMediaButton from './AddMediaButton'
import { useRequest } from 'hooks/use-request'
import { useAlertStore } from 'hooks/store/use-alert-store'
import axios from 'axios'
import { loadImgAsync } from 'util/imageHandling'
import ImageUploadDialog from './ImageUploadDialog'
import VideoUploadDialog from './VideoUploadDialog'

const { REACT_APP_ASSET_URL, REACT_APP_PUBLIC_URL } = process.env

const ArForm = ({ card, onSubmit }) => {
  const { selectPack, packs } = usePackStore()

  const { eid } = useParams()

  const pack = selectPack(eid)

  const { setError } = useAlertStore()

  const { image, imageHeight, imageWidth, video, videoDuration, targets } = card

  let imageSrc = image ? REACT_APP_ASSET_URL + '/' + image : null
  let videoSrc = video ? REACT_APP_ASSET_URL + '/' + video : null

  const showOnboarding = packs.length === 1 && !isMobile && !isTablet

  const [isLoading, setIsLoading] = useState(false)
  // const [percent, setPercent] = useState(0)

  const { request } = useRequest()

  useEffect(() => {
    if (
      card.image &&
      card.imageHeight &&
      card.imageWidth &&
      card.video &&
      card.videoDuration &&
      !card.targets &&
      !isLoading
    ) {
      const getImageTargets = async () => {
        setIsLoading(true)

        try {
          const response = await axios.request({
            url: imageSrc,
            responseType: 'blob',
          })

          const blob = response.data
          const src = await URL.createObjectURL(blob)

          let img = await loadImgAsync(src)
          URL.revokeObjectURL(src)

          const compiler = new window.MINDAR.IMAGE.Compiler()
          await compiler.compileImageTargets(
            [img]
            // , progress => {setPercent(progress.toFixed(0))}
          )

          const exportedBuffer = await compiler.exportData()
          var targetBlob = new Blob([exportedBuffer])
          var targetFile = new File([targetBlob], `${eid}-targets.mind`)

          let { signedUrl, imageFilepath } = await request({
            url: '/auth/sign-s3',
            method: 'POST',
            data: {
              fileName: `${eid}-targets`,
              fileType: 'application/mind',
            },
          })

          await request({
            url: signedUrl,
            method: 'PUT',
            data: targetFile,
            timeout: 100000,
          })

          await onSubmit({ targets: imageFilepath })
        } catch (err) {
          setError({
            message:
              'Sorry, there was an error creating your experience. Please try again.',
          })
          setIsLoading(false)
        }
      }

      getImageTargets()
    }
  }, [isLoading, eid, imageSrc, setError, card, request, onSubmit])

  useEffect(() => {
    if (targets) {
      setIsLoading(false)
    }
  }, [targets])

  const [videoDialogIsOpen, setVideoDialogIsOpen] = useState(false)
  const [imageDialogIsOpen, setImageDialogIsOpen] = useState(false)

  const showTooltips =
    showOnboarding && !videoDialogIsOpen && !imageDialogIsOpen

  const submitImage = async ({ filepath, height, width }) => {
    const packLink = `${REACT_APP_PUBLIC_URL}/p/${eid}`

    onSubmit({
      image: filepath,
      imageHeight: height,
      imageWidth: width,
    })

    const pieceData = {
      title: pack.name,
      pack: eid,
      isDirect: true,
      directLink: packLink,
      image: filepath,
    }

    try {
      await request({
        url: `/pieces`,
        method: 'POST',
        data: pieceData,
      })
    } catch (err) {}
  }
  const submitVideo = ({ filepath, duration, height, width }) => {
    let media = {}
    if (filepath) {
      media.video = filepath
    }
    if (duration || height || width) {
      media.videoDuration = duration
      media.videoWidth = width
      media.videoHeight = height
    }
    onSubmit(media)
  }

  return (
    <>
      <ImageUploadDialog
        open={imageDialogIsOpen}
        imageUrl={imageSrc}
        videoUrl={videoSrc}
        videoDuration={videoDuration}
        width={imageWidth}
        height={imageHeight}
        submitImage={submitImage}
        onClose={() => setImageDialogIsOpen(false)}
      />
      <VideoUploadDialog
        open={videoDialogIsOpen}
        videoUrl={videoSrc}
        videoDuration={videoDuration}
        submit={submitVideo}
        onClose={() => setVideoDialogIsOpen(false)}
      />

      <Box pb={2}>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="100%"
          flexWrap="wrap"
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            <AddMediaButton
              mediaType="video"
              // updateMedia={handleUpdateMedia}
              videoDuration={videoDuration}
              videoSrc={videoSrc}
              imageSrc={imageSrc}
              // disabled={!!targets}
              showTooltips={showTooltips}
              handleClick={() => setVideoDialogIsOpen(true)}
            />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <LinkIcon
                fontSize="large"
                color={targets ? 'secondary' : 'primary'}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
            )}

            <AddMediaButton
              mediaType="image"
              // updateMedia={handleUpdateMedia}
              imageSrc={imageSrc}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
              videoSrc={videoSrc}
              videoDuration={videoDuration}
              // disabled={!!targets}
              showTooltips={showTooltips}
              handleClick={() => setImageDialogIsOpen(true)}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ArForm
