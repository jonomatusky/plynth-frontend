import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchUser,
  createUser,
  updateUser,
  clearUser,
  fetchUserList,
  acceptInvite,
} from 'redux/userSlice'

export const useUserStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetchUser = useCallback(async () => {
    await dispatchThunk(fetchUser)
  }, [dispatchThunk])

  const _fetchUserList = useCallback(async () => {
    await dispatchThunk(fetchUserList)
  }, [dispatchThunk])

  const _createUser = useCallback(
    async user => {
      await dispatchThunk(createUser, user)
    },
    [dispatchThunk]
  )

  const _updateUser = useCallback(
    async updates => {
      await dispatchThunk(updateUser, { ...updates })
    },
    [dispatchThunk]
  )

  const _acceptInvite = useCallback(
    async code => {
      await dispatchThunk(acceptInvite, { code })
    },
    [dispatchThunk]
  )

  const _clearUser = useCallback(() => {
    dispatch(clearUser)
  }, [dispatch])

  const {
    user,
    users,
    status,
    createStatus,
    updateStatus,
    userListStatus,
    error,
    scanRoute,
    locationHistory,
  } = useSelector(state => state.user)

  return {
    fetchUser: _fetchUser,
    fetchUserList: _fetchUserList,
    createUser: _createUser,
    updateUser: _updateUser,
    clearUser: _clearUser,
    acceptInvite: _acceptInvite,
    user,
    users,
    status,
    createStatus,
    updateStatus,
    userListStatus,
    error,
    scanRoute,
    locationHistory,
  }
}

export default useUserStore
