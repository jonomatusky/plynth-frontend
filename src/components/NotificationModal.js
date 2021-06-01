import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import ActionButton from './ActionButton'

const NotificationModal = ({
  open,
  handleClose,
  primaryMessage,
  secondaryMessage,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
  isLoading,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>{primaryMessage}</DialogTitle>
      <DialogContent dividers>{secondaryMessage}</DialogContent>
      <DialogActions>
        <ActionButton
          fullWidth={true}
          variant="text"
          onClick={secondaryAction}
          label={secondaryActionLabel}
        />
        <ActionButton
          fullWidth={true}
          onClick={primaryAction}
          label={primaryActionLabel}
          loading={isLoading}
        />
      </DialogActions>
    </Dialog>
  )
}

export default NotificationModal
