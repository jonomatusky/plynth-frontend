import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'

export default function usePageTrack() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, hash])
}
