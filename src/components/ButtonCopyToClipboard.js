import { useState } from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { FilterNone } from '@material-ui/icons'
import CopyToClipboard from 'react-copy-to-clipboard'

const ButtonCopyToClipboard = ({ children, textToCopy }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleTooltipOpen = () => {
    setShowTooltip(true)
  }

  const handleTooltipClose = () => {
    setShowTooltip(false)
  }

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleTooltipOpen}>
      <Tooltip
        open={showTooltip}
        leaveDelay={1500}
        onClose={handleTooltipClose}
        title="Copied to clipboard!"
        placement="right"
      >
        <Button
          endIcon={<FilterNone fontSize="small" />}
          size="small"
          style={{ textTransform: 'none' }}
          color="secondary"
          disableElevation
        >
          <Typography>{children}</Typography>
        </Button>
      </Tooltip>
    </CopyToClipboard>
  )
}

export default ButtonCopyToClipboard
