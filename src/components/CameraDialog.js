import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Link,
  DialogActions,
} from '@material-ui/core'
import {
  isIOS,
  isSafari,
  isChrome,
  isAndroid,
  isMobile,
} from 'react-device-detect'

const CameraDialog = ({
  username,
  packId,
  cardIndex,
  style,
  open,
  onClose,
}) => {
  let content

  console.log('Safari: ' + isSafari)

  if (!isMobile) {
    content = (
      <Typography pb={1}>
        Make sure your browser has access to your device's camera. If you're
        still unable to take a photo,{' '}
        <Link
          href="/s/contact"
          target="_blank"
          color="inherit"
          underline="always"
        >
          contact us
        </Link>{' '}
        for support.
      </Typography>
    )
  } else if (isIOS && isSafari) {
    content = (
      <>
        <Typography pb={1}>
          Make sure to give Safari access to your device's camera.
        </Typography>
        <Box pb={1}>
          <ol>
            <li>Open the Settings app</li>
            <li>Scroll down and tap Safari</li>
            <li>
              Scrop down to the Settings for Websites section and tap Camera
            </li>
            <li>Tap "Ask" or "Allow"</li>
          </ol>
        </Box>
        <Typography pb={1}>
          If you're still unable to take a photo,{' '}
          <Link
            href="/s/contact"
            target="_blank"
            color="inherit"
            underline="always"
          >
            contact us
          </Link>{' '}
          for support.
        </Typography>
      </>
    )
  } else if (isAndroid && isChrome) {
    content = (
      <>
        <Typography pb={1}>
          Make sure to give Chrome access to your device's camera.
        </Typography>
        <Typography pb={1}>
          <ol>
            <li>Open the Settings app</li>
            <li>Scroll down and tap Chrome</li>
            <li>Flip switch next to "Camera"</li>
          </ol>
        </Typography>
        <Typography pb={1}>
          If you're still unable to take a photo,{' '}
          <Link
            href="/s/contact"
            target="_blank"
            color="inherit"
            underline="always"
          >
            contact us
          </Link>{' '}
          for support.
        </Typography>
      </>
    )
  } else if (isIOS && !isSafari) {
    content = (
      <>
        <Typography pb={1}>
          We're having trouble accessing your device's camera. Try switching to
          Safari for the best experience. If you're still unable to take a
          photo,{' '}
          <Link
            href="/s/contact"
            target="_blank"
            color="inherit"
            underline="always"
          >
            contact us
          </Link>{' '}
          for support.
        </Typography>
      </>
    )
  } else if (isAndroid && !isChrome) {
    content = (
      <>
        <Typography pb={1}>
          We're having trouble accessing your device's camera. Try switching to
          Chrome for the best experience. If you're still unable to take a
          photo,{' '}
          <Link
            href="/s/contact"
            target="_blank"
            color="inherit"
            underline="always"
          >
            contact us
          </Link>{' '}
          for support.
        </Typography>
      </>
    )
  } else {
    content = (
      <>
        <Typography pb={1}>
          If you're unable to take a photo, try switching to your device's
          default browser (Safari on iOS, Chrome on Andriod).
        </Typography>
        <Typography pb={1}>
          If you're still having issues, check that your browser has access to
          your device's camera.
        </Typography>
        <Typography pb={1}>
          1. On iPhone: Open the Settings app → Scroll down and tap Safari →
          Flip switch next to "Camera"
        </Typography>
        <Typography pb={1}>
          2. On Android: Open the Settings app → Scroll down and tap Chrome →
          Tap Permissions → Flip switch next to "Camera"
        </Typography>
        <Typography pb={1}>
          If you're still unable to take a photo,{' '}
          <Link
            href="/s/contact"
            target="_blank"
            color="inherit"
            underline="always"
          >
            contact us
          </Link>{' '}
          for support.
        </Typography>
      </>
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box pt={1}>Trouble Accessing Camera</Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {content}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {username && <Button onClick={onClose}>{`Close & Try Again`}</Button>}
        {!username && (
          <>
            <Button component={RouterLink} to={'/'}>
              Exit
            </Button>
            <Button onClick={onClose}>Try Again</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default CameraDialog
