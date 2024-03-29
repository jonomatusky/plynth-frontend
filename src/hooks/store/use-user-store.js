import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetchUser,
  createUser,
  createMe,
  updateUser,
  clearUser,
  fetchUserList,
  acceptInvite,
  subscribe,
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

  const _createMe = useCallback(
    async user => {
      await dispatchThunk(createMe, user)
    },
    [dispatchThunk]
  )

  const _subscribe = useCallback(
    async ({ email, tags, tagsToRemove }) => {
      try {
        await dispatchThunk(subscribe, { email, tags, tagsToRemove })
      } catch (err) {}
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
    dispatch(clearUser())
  }, [dispatch])

  const {
    user,
    users,
    status,
    createStatus,
    createMeStatus,
    updateStatus,
    userListStatus,
    subscribeStatus,
    error,
    scanRoute,
    locationHistory,
  } = useSelector(state => state.user)

  return {
    fetchUser: _fetchUser,
    fetchUserList: _fetchUserList,
    createUser: _createUser,
    createMe: _createMe,
    updateUser: _updateUser,
    clearUser: _clearUser,
    acceptInvite: _acceptInvite,
    subscribe: _subscribe,
    user,
    users,
    status,
    createStatus,
    createMeStatus,
    updateStatus,
    userListStatus,
    subscribeStatus,
    error,
    scanRoute,
    locationHistory,
  }
}

export default useUserStore
