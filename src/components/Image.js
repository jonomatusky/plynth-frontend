import React, { useState } from 'react'

const Image = ({ alt, src, height, width, style, ...props }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  return (
    <>
      {!!src && (
        <img
          alt={alt}
          src={src}
          style={{ height, width, ...style }}
          {...props}
          onLoad={() => setImageIsLoaded(true)}
        />
      )}
      {!imageIsLoaded && (
        <div
          style={{
            width,
            height,
          }}
        />
      )}
    </>
  )
}

export default Image
