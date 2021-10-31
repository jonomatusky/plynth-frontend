import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import { Edit, Public, Visibility, Link as LinkIcon } from '@mui/icons-material'

import CopyToClipboard from 'react-copy-to-clipboard'

const { REACT_APP_PUBLIC_URL } = process.env

const PackListItem = ({ pack, onSelectPack, isSelected }) => {
  const packLink = `${REACT_APP_PUBLIC_URL}/p/${pack.id}`

  const [showTooltip, setShowTooltip] = useState(false)

  const handleTooltipOpen = () => {
    setShowTooltip(true)
  }

  const handleTooltipClose = () => {
    setShowTooltip(false)
  }

  return (
    // <Card onMouseOver={onSelectPack}>
    <Card>
      <CardContent>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">{pack.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" marginBottom={2}>
              <Public fontSize="small" color="secondary" />
              <Box marginLeft={1}>
                <Typography variant="subtitle2" color="secondary">
                  {pack.isPublic ? 'PUBLIC' : 'PRIVATE'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" position="flex-start">
              <Box flexBasis={0} minWidth="80px">
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      align="center"
                      color={
                        !pack.shareWithLink || !pack.isPublic
                          ? 'text.disabled'
                          : 'inherit'
                      }
                    >
                      Copy Link
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center" minWidth={48}>
                      <CopyToClipboard
                        text={packLink}
                        onCopy={handleTooltipOpen}
                      >
                        <Tooltip
                          open={showTooltip}
                          leaveDelay={1500}
                          onClose={handleTooltipClose}
                          title="Copied to clipboard!"
                          color="secondary"
                        >
                          <IconButton
                            disabled={!pack.shareWithLink || !pack.isPublic}
                            size="large"
                          >
                            <LinkIcon aria-label="copy" />
                          </IconButton>
                        </Tooltip>
                      </CopyToClipboard>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                flexBasis={0}
                minWidth="80px"
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                      Edit
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center" minWidth={48}>
                      <IconButton
                        component={Link}
                        to={`/admin/packs/${pack.id}/edit/cards`}
                        size="large"
                      >
                        <Edit aria-label="edit" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box
                flexBasis={0}
                minWidth="80px"
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      align="center"
                      color={isSelected ? 'primary.main' : 'inherit'}
                    >
                      Show
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center" minWidth={48}>
                      <IconButton onClick={onSelectPack} size="large">
                        {isSelected && (
                          <Visibility aria-label="view" color="primary" />
                        )}
                        {!isSelected && <Visibility aria-label="view" />}
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PackListItem
