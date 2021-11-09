import React, { useState, useEffect } from 'react'
import { Box, Grid, Button, Typography } from '@mui/material'

// import Button from 'components/Button'
import IconLinkItem from './IconLinkItem'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const ButtonsCard = ({ card, onSubmit, pending, onRemove }) => {
  const [links, setLinks] = useState(card.links)
  const [expanded, setExpanded] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const handleExpand = identifier => (event, isExpanded) => {
    setExpanded(isExpanded ? identifier : false)
  }

  useEffect(() => {
    setLinks(card.links)
  }, [card.links])

  const handleAdd = event => {
    const newLinks = [...card.links, { type: 'other', url: '' }]
    const newReduxLinks = [...card.links, { type: 'other', url: '' }]
    setExpanded('new')
    setLinks(newLinks)
    onSubmit({ ...card, links: newReduxLinks })
  }

  const handleChange = (link, index) => {
    const newLinks = [...card.links]
    newLinks[index] = link
    onSubmit({ ...card, links: newLinks })
  }

  const handleDragEnd = result => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const newLinks = [...card.links]
    const [removed] = newLinks.splice(startIndex, 1)
    newLinks.splice(endIndex, 0, removed)

    if (expanded === 'new' && result.source.index === card.links.length - 1) {
      setExpanded(removed.id)
    }

    setLinks(newLinks)
    onSubmit({ ...card, links: newLinks })
  }

  const handleRemove = index => {
    const newLinks = [...card.links]
    newLinks.splice(index, 1)

    setLinks(newLinks)
    onSubmit({ ...card, links: newLinks })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box pt={2}>
          <Typography variant="h6">Links</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Grid container>
                  {(links || []).map((link, index) => (
                    <Grid item xs={12} key={link.id || 'new'}>
                      <Draggable draggableId={link.id || 'new'} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Box {...provided.dragHandleProps} pb={1}>
                              <IconLinkItem
                                disableButton={setButtonIsDisabled}
                                link={link}
                                index={index}
                                onChange={handleChange}
                                onExpand={handleExpand}
                                onRemove={handleRemove}
                                expanded={
                                  expanded === link.id ||
                                  (index === links.length - 1 &&
                                    expanded === 'new')
                                }
                              />
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    </Grid>
                  ))}
                  {provided.placeholder}
                </Grid>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={12}>
          <Button
            onClick={handleAdd}
            fullWidth
            size="large"
            variant="outlined"
            disabled={buttonIsDisabled}
          >
            Add Link +
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ButtonsCard
