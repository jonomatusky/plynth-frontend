import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
  Card,
  CardContent,
  CardActionArea,
  TextField,
} from '@mui/material'
import { Add, ArrowForwardIos, Person, Edit } from '@mui/icons-material'
import ContentEditable from 'react-contenteditable'

import usePackStore from 'hooks/store/use-pack-store'
import LivePreview from 'components/LivePreview'
import AdminNav from 'layouts/AdminNav'
import PackListItem from './components/PackListItem'
import Emoji from 'components/Emoji'
import PackNameForm from 'pages/PacksView/components/PackNameForm'
import { useHistory } from 'react-router'
import { useSession } from 'hooks/use-session'
import BarAccount from 'layouts/BarAccount'
import PreviewLayout from 'layouts/PreviewLayout'
import PieceName from './components/PieceName'

const Pieces = () => {
  const history = useHistory()
  const { logout } = useSession()
  const { packs, status, createPack } = usePackStore()

  const [selectedPackIndex, setSelectedPackIndex] = useState(0)
  const [newPack, setNewPack] = useState(null)

  const selectedPack = packs[selectedPackIndex] || {}

  const handleSelectPack = clickedPackIndex => {
    setSelectedPackIndex(clickedPackIndex)
  }

  const handleClick = () => {
    setNewPack({})
  }

  const handleCancel = () => {
    setNewPack(null)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    logout()
  }

  const handleSubmitPackName = async values => {
    const createdPack = await createPack({
      name: values.name,
      style: { backgroundColor: '#FFF9F0', fontColor: '#333333' },
      isPublic: true,
      shareWithLink: true,
    })
    if (createdPack.id) {
      history.push(`packs/${createdPack.id}/edit/cards`)
    } else {
      setNewPack(null)
    }
  }

  const inputRef = useRef()
  const [task, setTask] = useState('')

  return (
    <AdminNav>
      <BarAccount>
        <Box height="calc(100vh - 48px)" overflow="hidden">
          <Container disableGutters maxWidth={false}>
            <Box display="flex" width="100%" flexWrap="wrap" padding={6}>
              <Box display="flex" flexWrap="wrap" width="160px" mr={4}>
                <Box
                  height="160px"
                  width="100%"
                  borderRadius="6px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    variant="outlined"
                    // color="secondary"
                    color="primary"
                    sx={{
                      height: '160px',
                      width: '100%',
                      // backgroundColor: '#00000033',
                      // ':hover': {
                      //   backgroundColor: '#00000066',
                      // },
                    }}
                    size="large"
                    // variant="contained"
                    disableElevation
                  >
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignitems="center"
                      justifyContent="center"
                      width="100%"
                    >
                      <Add sx={{ fontSize: 40 }} />

                      <Typography
                        fontSize="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Create New Piece
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box width="100%" pt={1}>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                  ></Typography>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap" width="160px" mr={4}>
                <Card>
                  <CardActionArea sx={{ padding: '8px' }}>
                    <Box
                      height="144px"
                      width="144px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexWrap="wrap"
                    >
                      <Box
                        width="144px"
                        height="124px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        Test
                      </Box>
                      <Box
                        width="100%"
                        height="20px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="caption">2:3 (4"x6")</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption">1:03 sec</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
                <PieceName
                  text={task}
                  placeholder="Your First Piece with long name"
                  type="input"
                  childRef={inputRef}
                >
                  <TextField
                    variant="standard"
                    ref={inputRef}
                    type="text"
                    name="task"
                    placeholder="Your First Piece with long name"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    size="small"
                    autoFocus={true}
                  />
                </PieceName>
              </Box>
            </Box>
          </Container>
        </Box>
      </BarAccount>
    </AdminNav>
  )
}

export default Pieces
