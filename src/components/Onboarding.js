import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
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
    if (setIsOpen && content.length > 0) {
      setDialogIsOpen(true)
    }
  }, [setIsOpen, content])

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
    <Dialog open={dialogIsOpen}>
      <DialogContent>
        <Box height="400px" width="500px" pr={2} pl={2}>
          <SwipeableViews
            index={index}
            onChangeIndex={setIndex}
            containerStyle={{
              height: '100%',
            }}
          >
            {content.map(step => {
              const fields = step.fields

              return (
                <Box key={fields.order}>
                  <Box
                    height="50px"
                    padding="25px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h5">
                      <b>{fields.showTitle && fields.title}</b>
                    </Typography>
                  </Box>
                  <Box
                    height="275px"
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
          </SwipeableViews>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid
            item
            xs={4}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              {index !== 0 && (
                <Button startIcon={<ArrowBackIos />} onClick={decrement}>
                  Prev
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            {content.length > 1 &&
              content.map((dot, i) => {
                return (
                  <Box
                    key={i}
                    bgcolor="primary.main"
                    borderRadius="50%"
                    width="7px"
                    height="7px"
                    mr="5px"
                    style={i !== index ? { opacity: '30%' } : null}
                  />
                )
              })}
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            {index < content.length - 1 ? (
              <Button endIcon={<ArrowForwardIos />} onClick={increment}>
                Next
              </Button>
            ) : (
              <Button endIcon={<Check />} onClick={handleClose}>
                Get Started
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default Onboarding
