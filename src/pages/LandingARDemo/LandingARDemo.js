// import React, { useEffect, useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
// import { Grid, Typography, Container, Box } from '@mui/material'
// // import { HashLink } from 'react-router-hash-link'
// import { isMobile } from 'react-device-detect'

// import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

// import contentful from 'config/contentful'
// import PublicNav from 'layouts/PublicNav'
// import Carousel from 'react-material-ui-carousel'
// import Image from 'components/Image'

// // const SmoothHashLink = React.forwardRef((props, ref) => (
// //   <HashLink smooth innerRef={ref} {...props} />
// // ))

// const LandingARDemo = () => {
//   const { search } = useLocation()
//   const history = useHistory()
//   const [content, setContent] = useState({})
//   const [demoImages, setDemoImages] = useState([])

//   if (search === '?utm_source=qr') {
//     history.push('/postcardmixtapes')
//   }

//   useEffect(() => {
//     const getContent = async () => {
//       try {
//         const contentResponse = await contentful.getEntry(
//           '5FN3gDvSDZQLgm5VMTbvRo'
//         )
//         const imagesResponse = await contentful.getEntries({
//           content_type: 'arImageDemos',
//           'fields.active': true,
//           order: 'fields.order',
//         })
//         setContent(contentResponse.fields)
//         setDemoImages(imagesResponse.items)
//       } catch (err) {}
//     }

//     getContent()
//   }, [])

//   return (
//     <PublicNav hideFooter right={<></>}>
//       <ScrollToTopOnMount />

//       <Container maxWidth="lg" id="about" disableGutters>
//         <Grid container justifyContent="center">
//           <Grid item xs={12} md={1} />
//           <Grid item xs={12} sm={8} md={4}>
//             <Grid container sx={{ height: '100%' }} justifyContent="center">
//               <Grid item xs={11} mt={isMobile ? 6 : 15}>
//                 <Typography
//                   color="white"
//                   variant="h4"
//                   letterSpacing={1}
//                   style={{ fontWeight: 800 }}
//                   pb={3}
//                   textAlign="center"
//                 >
//                   {content.claimHeading}
//                 </Typography>
//                 <Typography
//                   color="white"
//                   pb={3}
//                   variant="h6"
//                   style={{
//                     whiteSpace: 'pre-line',
//                     overflowWrap: 'break-word',
//                   }}
//                   textAlign="center"
//                 >
//                   {content.claimSubheading}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12} md={6} container justifyContent="center">
//             <Grid item xs={12}>
//               <Box mt={6}>
//                 {
//                   <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
//                     {demoImages.map(demoImage => {
//                       return (
//                         <Box maxWidth="100%" key={demoImage.sys.id}>
//                           <Image
//                             width="100%"
//                             height="70vh"
//                             style={{ objectFit: 'contain' }}
//                             src={
//                               demoImage.fields.image
//                                 ? 'https:' +
//                                   demoImage.fields.image.fields.file.url
//                                 : null
//                             }
//                             alt={demoImage.fields.title}
//                           />
//                         </Box>
//                       )
//                     })}
//                   </Carousel>
//                 }
//               </Box>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} md={1} />
//         </Grid>
//       </Container>
//     </PublicNav>
//   )
// }

// export default LandingARDemo
