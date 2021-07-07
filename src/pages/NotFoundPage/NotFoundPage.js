import React from 'react'

import NotFound from 'components/NotFound'
import WebsiteNavBar from 'components/WebsiteNavBar'
import PublicNav from 'layouts/PublicNav'

const NotFoundPage = () => {
  return (
    <>
      <PublicNav />
      <WebsiteNavBar />
      <NotFound fontColor="white" />
    </>
  )
}

export default NotFoundPage
