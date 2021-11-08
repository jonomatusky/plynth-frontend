import React from 'react'
import QRCode from 'qrcode.react'

const DownloadQR = ({ children, qrValue, fileName }) => {
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById('qr-gen')
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = fileName + '.png' || `Plynth_Portal_QR.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const childrenWithProps = React.Children.map(children, child => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: downloadQRCode })
    }
    return child
  })

  return (
    <>
      {childrenWithProps}
      <QRCode
        hidden
        id="qr-gen"
        value={qrValue}
        size={290}
        includeMargin={true}
      />
    </>
  )
}

export default DownloadQR
