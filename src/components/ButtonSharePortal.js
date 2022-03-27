import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import copy from 'copy-to-clipboard'

import DownloadQR from 'components/DownloadQr'

const ButtonSharePortal = ({ url }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [linkIsCopied, setLinkIsCopied] = useState(false)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
    setLinkIsCopied(false)
  }

  const handleCopy = event => {
    copy(url)
    setLinkIsCopied(true)
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        Share
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        transitionDuration={0}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorPosition={{ left: 0, top: -20 }}
        onClose={handleClose}
        // disablePortal={true}
      >
        {!linkIsCopied && (
          <MenuItem onClick={handleCopy}>Copy my Leaflet portal URL</MenuItem>
        )}
        {linkIsCopied && <MenuItem>Copied!</MenuItem>}

        <DownloadQR qrValue={url}>
          <MenuItem>Download my Leaflet portal QR code</MenuItem>
        </DownloadQR>
      </Menu>
    </>
  )
}

export default ButtonSharePortal
