import React from 'react'
import { Box } from '@material-ui/core'
import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'

const LivePreview = ({ pack, cardIndex, isLoading }) => {
  // const [index, setIndex] = useState(0)

  const cards = (pack || {}).cards
  const card = (cards || [])[cardIndex]
  const type = (card || {}).type

  // this ensures that in the case of a reorder, the index isn't updated prematurely
  // useEffect(() => {
  //   const set = () => {
  //     setIndex(cardIndex)
  //   }
  //   if (!isLoading) {
  //     set()
  //   }
  // }, [cardIndex, isLoading])

  return (
    <Box
      height="600px"
      width="300px"
      border={15}
      borderRadius={40}
      bgcolor="divider"
    >
      {type === 'text' && <CardText card={card} />}
      {type === 'video' && <CardVideo card={card} />}
      {type === 'download' && <CardDownload card={card} />}
    </Box>
  )
}

export default LivePreview
