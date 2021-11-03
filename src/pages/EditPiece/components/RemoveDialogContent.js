import React, { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
} from '@mui/material'
import {
  Upload,
  CameraAlt,
  FilterFrames,
  Portrait,
  Close,
  Crop,
  Loop,
  CropPortrait,
  CropLandscape,
  CropSquare,
  CropOriginal,
} from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getCroppedImg } from 'util/getCroppedImg'
import { useRequest } from 'hooks/use-request'

const RemoveDialogContent = ({ onClose }) => {
  const replaceImage = () => {
    setImage(null)
  }

  return (
    <>
      <DialogTitle>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box>Replace Image?</Box>
          <Box>
            <Button
              endIcon={<Close />}
              onClick={onClose}
              variant="secondary"
              size="small"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      <Box display="flex">
        <Box flexGrow={1}>
          <Box width="100%" pr={2} pb={2}>
            <Box
              height="400px"
              width="484px"
              backgroundColor="#00000010"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={image}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                alt="Piece"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Button
            color="secondary"
            endIcon={<Loop />}
            fullWidth
            size="small"
            // sx={{
            //   backgroundColor: '#ffffff88',
            //   '&:hover': { backgroundColor: '#ffffff50' },
            // }}
            onClick={replaceImage}
          >
            Replace
          </Button>

          <Button
            variant="contained"
            onClick={handleClose}
            disabled={isCropping}
          >
            Done
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default RemoveDialogContent
