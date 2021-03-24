import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchPacks,
  createPack,
  updatePack,
  deletePack,
  setNewPackImage,
} from 'redux/packSlice'

export const usePackStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchPacks = useCallback(async () => {
    await dispatchThunk(fetchPacks)
  }, [dispatchThunk])

  const _createPack = useCallback(
    async pack => {
      const newPack = await dispatchThunk(createPack, pack)
      return newPack
    },
    [dispatchThunk]
  )

  const _updatePack = useCallback(
    async ({ id, ...pack }) => {
      await dispatchThunk(updatePack, { id, ...pack })
    },
    [dispatchThunk]
  )

  const _deletePack = useCallback(
    async id => {
      await dispatchThunk(deletePack, { id })
    },
    [dispatchThunk]
  )

  const _setPackImage = useCallback(
    image => {
      dispatch(setNewPackImage(image))
    },
    [dispatch]
  )

  const {
    packs,
    newPackImage,
    status,
    error,
    updateStatus,
    createStatus,
    filter,
  } = useSelector(state => state.packs)

  const selectPack = packId => {
    return (packs || []).find(pack => pack.id === packId)
  }

  const addCard = ({ id: packId, type: cardType }) => {
    const cards = (selectPack(packId) || {}).cards
    console.log(cards)
    const newCards = [...cards, { type: cardType }]
    console.log(newCards)
    _updatePack({ id: packId, cards: newCards })
  }

  return {
    fetchPacks: _fetchPacks,
    createPack: _createPack,
    updatePack: _updatePack,
    deletePack: _deletePack,
    setNewPackImage: _setPackImage,
    selectPack,
    addCard,
    filter,
    packs,
    newPackImage,
    status,
    error,
    updateStatus,
    createStatus,
  }
}

export default usePackStore
