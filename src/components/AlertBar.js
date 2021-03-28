import React from 'react'
import { Snackbar, SnackbarContent, Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import { useAlertStore } from 'hooks/store/use-alert-store'

const AlertBar = props => {
  const { error, clearError, message, clearMessage } = useAlertStore()

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        onClose={clearError}
      >
        <SnackbarContent
          sx={{
            backgroundColor: 'error.main',
            borderRadius: 0,
            fontWeight: 'bold',
          }}
          message={error}
          action={
            <Button
              sx={{ minWidth: '30px ' }}
              onClick={clearError}
              color="inherit"
              size="small"
            >
              <ClearIcon />
            </Button>
          }
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!message}
        onClose={clearMessage}
      >
        <SnackbarContent
          sx={{
            backgroundColor: 'secondary.main',
            borderRadius: 0,
            fontWeight: 'bold',
          }}
          message={error}
          action={
            <Button
              sx={{ minWidth: '30px ' }}
              onClick={clearError}
              color="inherit"
              size="small"
            >
              <ClearIcon />
            </Button>
          }
        />
      </Snackbar>
    </>
  )
}

export default AlertBar
