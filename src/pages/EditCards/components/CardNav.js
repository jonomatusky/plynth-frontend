import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Box,
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'

import Emoji from 'components/Emoji'
import { cardTypes } from 'components/CardCard'

// const useStyles = makeStyles(theme => ({
//   barPadding: {
//     minHeight: '48px',
//   },
// }))

const CardNav = ({
  cards,
  cardIndex,
  setCardIndex,
  setCardIndexIsUpdating,
}) => {
  const { packId } = useParams()
  const { updatePack } = usePackStore()
  const [cardsToDrag, setCardsToDrag] = useState(cards)

  useEffect(() => {
    const setCards = () => {
      setCardsToDrag(cards)
    }
    if ((cards || []).length > 0) {
      setCards(cards)
    }
  }, [cards])

  const handleBeforeCapture = result => {
    'handling capture'
    setCardIndexIsUpdating(true)
  }

  const handleDragEnd = result => {
    if (!result.destination) {
      setCardIndexIsUpdating(false)
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

    const newCards = Array.from(cardsToDrag)
    const [removed] = newCards.splice(startIndex, 1)
    newCards.splice(endIndex, 0, removed)

    setCardsToDrag(newCards)

    let updatedPack = { id: packId, cards: newCards }
    updatePack(updatedPack)
    setCardIndexIsUpdating(false)
  }

  const grid = 8

  const getItemStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 ${grid}px 0 0`,
    borderBottom: index === cardIndex && !isDragging ? `3px solid gray` : `0px`,
    // styles we need to apply on draggsables
    ...draggableStyle,
  })

  const getListStyle = isDraggingOver => ({
    display: 'flex',
    overflow: 'scroll',
  })

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onBeforeCapture={handleBeforeCapture}
    >
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {cardsToDrag &&
              cardsToDrag.length > 0 &&
              cardsToDrag.map((card, index) => (
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
                          <Grid container>
                            <Grid item xs={12}>
                              <CardActionArea
                                onClick={() => setCardIndex(index)}
                              >
                                <CardContent>
                                  <Typography variant="h4" align="center">
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
                                </CardContent>
                              </CardActionArea>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              container
                              justify="center"
                              {...provided.dragHandleProps}
                            >
                              <MoreHoriz />
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
  )
}

export default CardNav
