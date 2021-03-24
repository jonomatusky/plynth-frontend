import React from 'react'
import { Box, Hidden, makeStyles } from '@material-ui/core'
import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import ButtonPage from './ButtonPage'

const useStyles = makeStyles({
  phone: {
    background: props => props.backgroundColor || '#ffffff',
    color: props => props.fontColor || '#000000',
    borderColor: '#000000',
  },
})

const LivePreview = ({ pack, cardIndex, isLoading, setIndex }) => {
  // const [index, setIndex] = useState(0)

  const cards = (pack || {}).cards
  const card = (cards || [])[cardIndex]
  const type = (card || {}).type

  const style = (pack || {}).style
  const { fontColor } = style || {}

  const classes = useStyles(style)

  const Content = () => {
    return (
      <>
        {type === 'text' && <CardText card={card} style={style} />}
        {type === 'video' && <CardVideo card={card} style={style} />}
        {type === 'download' && <CardDownload card={card} style={style} />}
        {cardIndex !== 0 && (
          <ButtonPage
            isLeft
            onClick={() => setIndex(cardIndex - 1)}
            color={fontColor}
          />
        )}
        {cardIndex < (cards || []).length - 1 && (
          <ButtonPage
            isLeft={false}
            onClick={() => setIndex(cardIndex + 1)}
            color={fontColor}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Hidden lgDown>
        <Box
          width="300px"
          height="600px"
          border={15}
          borderRadius="40px"
          position="relative"
          className={classes.phone}
        >
          <Content />
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Box
          width="250px"
          height="475px"
          border={12}
          borderRadius="35px"
          position="relative"
          className={classes.phone}
        >
          <Content />
        </Box>
      </Hidden>
    </>
  )
}

export default LivePreview
