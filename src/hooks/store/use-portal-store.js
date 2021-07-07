import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchPortal, setCameraError } from 'redux/portalSlice'

export const usePortalStore = () => {
  const dispatchThunk = useThunk()
  const dispatch = useDispatch()

  const _fetchPortal = useCallback(
    async username => {
      await dispatchThunk(fetchPortal, { username })
    },
    [dispatchThunk]
  )

  const _setCameraError = useCallback(
    isError => {
      dispatch(setCameraError(isError))
    },
    [dispatch]
  )

  const { status, portalUser, cameraError } = useSelector(state => state.portal)

  return {
    fetchPortal: _fetchPortal,
    setCameraError: _setCameraError,
    portalUser,
    status,
    cameraError,
  }
}

export default usePortalStore
