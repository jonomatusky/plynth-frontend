import React from 'react'

import { Button, Grid, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iconOptions from 'util/iconOptions'

const useStyles = makeStyles({
  buttonRound: {
    borderRadius: '15px',
    height: '125px',
    width: '125px',
    border: '2px solid',
    color: props => `${props.fontColor}DD`,
    borderColor: props => props.fontColor,
    '&:hover': {
      border: '2px solid',
    },
  },
})

const ButtonSquareIconLink = ({ link, style, ...props }) => {
  const classes = useStyles(style)

  return (
    <Button
      {...props}
      className={classes.buttonRound}
      color="secondary"
      variant="outlined"
      href={link.url}
      target="_blank"
    >
      <Grid container justifyContent="center">
        <Grid item>
          <FontAwesomeIcon
            size="4x"
            icon={(iconOptions[link.type] || {}).faIcon || 'link'}
          />
        </Grid>
      </Grid>
    </Button>
  )
}

export default ButtonSquareIconLink
