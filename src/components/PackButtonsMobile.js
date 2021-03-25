import React from 'react'
import ButtonPackMobile from 'components/ButtonPackMobile'

const PackButtonsMobile = ({ fontColor, index, setIndex, lastIndex }) => {
  return (
    <>
      {index !== 0 && (
        <ButtonPackMobile
          isLeft
          onClick={() => setIndex(index - 1)}
          color={fontColor}
        />
      )}
      {index < lastIndex && (
        <ButtonPackMobile
          isLeft={false}
          onClick={() => setIndex(index + 1)}
          color={fontColor}
        />
      )}
    </>
  )
}

export default PackButtonsMobile
