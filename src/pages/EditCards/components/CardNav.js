import React from 'react'
import { useParams } from 'react-router'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  Box,
  Button as MuiButton,
} from '@material-ui/core'
import { Add, DragIndicator } from '@material-ui/icons'

import Emoji from 'components/Emoji'
import { cardTypes } from 'components/CardCard'

// const useStyles = makeStyles(theme => ({
//   barPadding: {
//     minHeight: '48px',
//   },
// }))

const CardNav = ({ cards, cardIndex, setCardIndex, updatePack }) => {
  const { packId } = useParams()
  // const [cardsToDrag, setCardsToDrag] = useState(cards)

  // useEffect(() => {
  //   const setCards = () => {
  //     setCardsToDrag(cards)
  //   }
  //   if ((cards || []).length > 0) {
  //     setCards(cards)
  //   }
  // }, [cards])

  const handleDragEnd = result => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index

    console.log('startIndex: ' + startIndex)
    console.log('endIndex: ' + endIndex)

    if (cardIndex === startIndex) {
      setCardIndex(endIndex)
    } else if (cardIndex > startIndex && cardIndex <= endIndex) {
      setCardIndex(cardIndex - 1)
    } else if (cardIndex < startIndex && cardIndex >= endIndex) {
      setCardIndex(cardIndex + 1)
    }

    const newCards = Array.from(cards)
    const [removed] = newCards.splice(startIndex, 1)
    newCards.splice(endIndex, 0, removed)

    // setCardsToDrag(newCards)

    let updatedPack = { id: packId, cards: newCards }
    updatePack(updatedPack)
  }

  const grid = 8

  const getItemStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 ${grid}px 0 0`,

    borderBottom:
      index === cardIndex && !isDragging
        ? `3px solid rgba(0, 0, 0, 0.26)`
        : `3px solid rgba(0, 0, 0, 0)`,
    // styles we need to apply on draggsables
    ...draggableStyle,
  })

  const getListStyle = isDraggingOver => ({
    display: 'flex',
    // overflow: 'scroll',
  })

  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        <Typography variant="body2">Current Cards:</Typography>
      </Grid>
      <Grid item xs={11}>
        <Box display="flex" alignContent="center" overflow="scroll">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {cards &&
                    cards.length > 0 &&
                    cards.map((card, index) => (
                      <Draggable
                        key={`navcard` + card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              index
                            )}
                          >
                            <Box paddingBottom={1} paddingTop={1}>
                              <Card>
                                <Grid container alignItems="center">
                                  <Grid item>
                                    <CardActionArea
                                      onClick={() => setCardIndex(index)}
                                    >
                                      <Box p={2} pr={1}>
                                        <Typography variant="h5" align="center">
                                          <Emoji
                                            label={card.type}
                                            symbol={
                                              cardTypes.find(
                                                cardType =>
                                                  cardType.type === card.type
                                              ).icon
                                            }
                                          />
                                        </Typography>
                                      </Box>
                                    </CardActionArea>
                                  </Grid>
                                  <Grid item {...provided.dragHandleProps}>
                                    <DragIndicator
                                      color="disabled"
                                      fontSize="small"
                                    />
                                  </Grid>
                                </Grid>
                              </Card>
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <MuiButton
            onClick={() => setCardIndex((cards || []).length)}
            size="small"
            style={{ minWidth: '30px' }}
          >
            <Add />
          </MuiButton>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}

export default CardNav
