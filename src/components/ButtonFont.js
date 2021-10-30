import React from 'react'
import { Box, Button, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    background: '#ffffff',
    color: '#222222',
  },
  type: {
    fontFamily: props => props.font,
  },
  label: {
    textTransform: 'capitalize',
  },
})

const ButtonFont = ({ font, setFont }) => {
  const classes = useStyles({ font })

  return (
    <Button
      onClick={() => setFont(font)}
      variant="outlined"
      classes={{ root: classes.root, label: classes.label }}
      color="secondary"
    >
      <Box display="flex" height="25px" alignItems="center">
        <Typography variant="h6" className={classes.type}>
          <Box>Aa</Box>
        </Typography>
      </Box>
    </Button>
  )
}

export default ButtonFont
