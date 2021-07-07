import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
import useUserStore from './store/use-user-store'

export default function usePageTrack() {
  const { pathname, hash } = useLocation()
  const { user } = useUserStore()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, hash, user])
}
