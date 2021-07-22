import { createClient } from 'contentful'

const { REACT_APP_CONTENTFUL_SPACE, REACT_APP_CONTENTFUL_TOKEN } = process.env

const client = createClient({
  accessToken: REACT_APP_CONTENTFUL_TOKEN,
  space: REACT_APP_CONTENTFUL_SPACE,
})

export default client
