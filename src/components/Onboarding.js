import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Image from './Image'
import { ArrowBackIos, ArrowForwardIos, Check } from '@material-ui/icons'
import contentful from 'config/contentful'
import SwipeableViews from 'react-swipeable-views'

const Onboarding = ({ setIsOpen, onClose }) => {
  const [content, setContent] = useState([])
  const [index, setIndex] = useState(0)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  useEffect(() => {
    if (setIsOpen) {
      setDialogIsOpen(true)
    }
  }, [setIsOpen])

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await contentful.getEntries({
          content_type: 'onboarding',
          order: 'fields.order',
          'fields.order[exists]': true,
        })

        setContent(response.items)
      } catch (err) {}
    }
    getContent()
  }, [])

  const increment = () => {
    setIndex(index + 1)
  }

  const decrement = () => {
    setIndex(index - 1)
  }

  const handleClose = () => {
    setIndex(0)
    setDialogIsOpen(false)
    onClose()
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleClose}>
      <DialogContent>
        <SwipeableViews
          index={index}
          onChangeIndex={setIndex}
          containerStyle={{
            height: '100%',
          }}
        >
          <Box height="400px" width="500px" pr={2} pl={2}>
            {content.map(step => {
              const fields = step.fields

              return (
                <Box key={fields.order}>
                  <Box
                    height="325px"
                    padding="25px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {fields.image && (
                      <Image
                        src={'https:' + fields.image.fields.file.url}
                        height="100%"
                      />
                    )}
                  </Box>
                  <Box
                    height="75px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography textAlign="center" variant="body2">
                      {fields.text}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          pr={2}
          pl={2}
        >
          <Box>
            {index !== 0 && (
              <Button startIcon={<ArrowBackIos />} onClick={decrement}>
                Prev
              </Button>
            )}
          </Box>
          <Box>
            {index < content.length - 1 ? (
              <Button endIcon={<ArrowForwardIos />} onClick={increment}>
                Next
              </Button>
            ) : (
              <Button endIcon={<Check />}>Get Started</Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default Onboarding
