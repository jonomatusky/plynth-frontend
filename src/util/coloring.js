const coloring = {}

export const getFontColor = color => {
  let textColor

  const hexToRGB = h => {
    let r = 0,
      g = 0,
      b = 0

    // 3 digits
    if (h.length === 4) {
      r = h[1] + h[1]
      g = h[2] + h[2]
      b = h[3] + h[3]

      // 6 digits
    } else if (h.length === 7) {
      r = h[1] + h[2]
      g = h[3] + h[4]
      b = h[5] + h[6]
    }

    return [r, g, b]
  }

  try {
    const rgb = hexToRGB(color)

    const brightness =
      Math.round(
        parseInt(rgb[0], 16) * 299 +
          parseInt(rgb[1], 16) * 587 +
          parseInt(rgb[2], 16) * 114
      ) / 1000

    if (brightness > 200) {
      textColor = '#333333'
    } else if (brightness > 125) {
      textColor = '#000000'
    } else {
      textColor = '#ffffff'
    }
  } catch (err) {}

  return textColor
}

coloring.getFontColor = getFontColor

export default coloring
