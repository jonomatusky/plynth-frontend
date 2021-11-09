import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
import ReactGA from 'react-ga'
import useUserStore from './store/use-user-store'

export default function usePageTrack() {
  const { pathname, search, hash } = useLocation()
  const { user } = useUserStore()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, hash, user])

  ReactGA.pageview(pathname + search)
}
