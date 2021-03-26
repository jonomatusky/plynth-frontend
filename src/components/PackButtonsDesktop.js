import React from 'react'
import ButtonPackDesktop from 'components/ButtonPackDesktop'

const PackButtonsDesktop = ({ fontColor, index, setIndex, lastIndex }) => {
  return (
    <>
      {index !== 0 && (
        <ButtonPackDesktop
          isLeft
          onClick={() => setIndex(index - 1)}
          color={fontColor}
        />
      )}
      {index <= lastIndex && (
        <ButtonPackDesktop
          isLeft={false}
          onClick={() => setIndex(index + 1)}
          color={fontColor}
        />
      )}
    </>
  )
}

export default PackButtonsDesktop
