import React, { useState, useEffect } from 'react'
import { Box, Grid, Button, TextField, Typography } from '@material-ui/core'

// import Button from 'components/Button'
import IconLinkItem from './IconLinkItem'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const CardFormButtons = ({ card, onSubmit, pending, onRemove }) => {
  const [links, setLinks] = useState(card.links)
  const [title, setTitle] = useState(card.title)
  const [expanded, setExpanded] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const handleExpand = identifier => (event, isExpanded) => {
    setExpanded(isExpanded ? identifier : false)
  }

  useEffect(() => {
    setTitle(card.title)
  }, [card.title])

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

  const handleTitleChange = event => {
    const newTitle = event.target.value
    setTitle(newTitle)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setButtonIsDisabled(false)
    if (title !== card.title) {
      onSubmit({ ...card, title })
    }
  }

  // const getItemStyle = (isDragging, draggableStyle, index) => ({
  //   // some basic styles to make the items look a bit nicer
  //   userSelect: 'none',
  //   margin: `0 ${grid}px 0 0`,

  //   borderBottom:
  //     index === cardIndex && !isDragging
  //       ? `3px solid rgba(0, 0, 0, 0.26)`
  //       : `3px solid rgba(0, 0, 0, 0)`,
  //   // styles we need to apply on draggables
  //   ...draggableStyle,
  // })

  // const getListStyle = isDraggingOver => ({
  //   display: 'flex',
  //   // overflow: 'scroll',
  // })

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
        <Box mb={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              name="title"
              label="Title"
              placeholder="My Links"
              autoComplete="off"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleSubmit}
              InputLabelProps={{
                shrink: true,
              }}
              onFocus={() => setButtonIsDisabled(true)}
            />
          </form>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Links</Typography>
      </Grid>
      <Grid item xs={12}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <Grid container>
                  {(links || []).map((link, index) => (
                    // <>
                    <Grid item xs={12} key={link.id || 'new'}>
                      <Draggable draggableId={link.id || 'new'} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            // style={getItemStyle(
                            //   snapshot.isDragging,
                            //   provided.draggableProps.style,
                            //   index
                            // )}
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
                    //   <Grid item xs={1}>
                    //     <IconButton>
                    //       <
                    //     </IconButton>
                    //   </Grid>
                    // </>
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
      <Grid item>
        <Box height="20px" />
      </Grid>
    </Grid>
  )
}

export default CardFormButtons
