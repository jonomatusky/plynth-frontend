import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@material-ui/core'
import { Edit, Public, Visibility } from '@material-ui/icons'

import ButtonCopyToClipboard from 'components/ButtonCopyToClipboard'
import Emoji from 'components/Emoji'
import { cardTypes } from 'components/CardCard'

const { REACT_APP_PUBLIC_URL } = process.env

const PackListItem = ({ pack, onSelectPack, isSelected }) => {
  const packLink = `${REACT_APP_PUBLIC_URL}/p/${pack.id}`

  return (
    // <Card onMouseOver={onSelectPack}>
    <Card>
      <CardContent>
        <Grid container item xs={12} justifyContent="space-between">
          <Grid item xs={8} container>
            <Grid item xs={12}>
              <Typography variant="h5">{pack.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box minHeight="25px">
                <Grid container spacing={1} alignItems="center">
                  {(pack.cards || []).map((card, index) => {
                    const type = card.type
                    const cardInfo = cardTypes.find(
                      cardType => cardType.type === type
                    )

                    return (
                      <Grid item key={card.id || index}>
                        <Emoji label={type} symbol={cardInfo.icon} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box ml="-5px">
                <ButtonCopyToClipboard textToCopy={packLink}>
                  Copy Link
                </ButtonCopyToClipboard>
              </Box>
            </Grid>
            {/* <Grid item xs={12}>
                {pack.createdAt && pack.updatedAt && (
                  <Typography variant="body2">{`Created: ${new Date(
                    pack.createdAt
                  ).toLocaleDateString()} | Edited: ${new Date(
                    pack.updatedAt
                  ).toLocaleDateString()}`}</Typography>
                )}
              </Grid> */}
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Chip
                    icon={
                      pack.isPublic && (
                        <Box ml={1} display="flex" alignItems="center">
                          <Public fontSize="small" />
                        </Box>
                      )
                    }
                    label={pack.isPublic ? 'PUBLIC' : 'PRIVATE'}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item container justifyContent="flex-end">
                <Box display="flex" justifyContent="flex-end">
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
                        >
                          <Edit aria-label="edit" />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center">
                        Preview
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box textAlign="center" minWidth={48}>
                        <IconButton onClick={onSelectPack}>
                          {isSelected && (
                            <Visibility aria-label="view" color="primary" />
                          )}
                          {!isSelected && <Visibility aria-label="view" />}
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PackListItem
