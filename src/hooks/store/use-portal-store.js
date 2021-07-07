import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetchPortal, setCameraError } from 'redux/portalSlice'
import useAlertStore from './use-alert-store'

export const usePortalStore = () => {
  const dispatchThunk = useThunk()
  const dispatch = useDispatch()
  const { clearError } = useAlertStore()

  const _fetchPortal = useCallback(
    async username => {
      try {
        await dispatchThunk(fetchPortal, { username })
      } catch (err) {
        clearError()
      }
    },
    [dispatchThunk, clearError]
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
