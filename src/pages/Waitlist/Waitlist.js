import React from 'react'

import WebsiteNavBar from 'components/WebsiteNavBar'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Div100vh from 'components/Div100vh'

const Waitlist = () => {
  return (
    <>
      <ScrollToTopOnMount />
      <WebsiteNavBar />
      <Div100vh>
        <iframe
          title="waitlist"
          id="typeform-full"
          width="100%"
          height="100%"
          frameborder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          src="https://form.typeform.com/to/BPzodYqK?typeform-medium=embed-snippet"
        ></iframe>
      </Div100vh>
    </>
  )
}

export default Waitlist
