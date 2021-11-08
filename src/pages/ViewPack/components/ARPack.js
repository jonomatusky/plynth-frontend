import React, { useEffect, useRef, useState } from 'react'
import 'mind-ar/dist/mindar-image.prod.js'
import 'aframe'
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import './ARPack.css'
import { Box, IconButton } from '@mui/material'
import { VolumeOff, VolumeUp } from '@mui/icons-material'

import ScanInstructions from 'images/scan-instruction.svg'
import LoadingScreen from 'components/LoadingScreen'
import { use100vh } from 'hooks/use-100-vh'

const ARPack = ({ pack }) => {
  const { assetUrl, targetsUrl } = pack.cards[0]
  const sceneRef = useRef(null)
  const [isFound, setIsFound] = useState(false)
  const [showPreload, setShowPreload] = useState(true)

  document.body.style.backgroundColor = '#000000'

  const vh100 = use100vh()

  const play = () => {
    const video = document.getElementById('asset')
    if (video) {
      video.play()
    }
  }

  const pause = () => {
    const video = document.getElementById('asset')
    if (video) {
      video.pause()
    }
  }

  useEffect(() => {
    const sceneEl = sceneRef.current
    const arSystem = sceneEl.systems['mindar-image-system']

    sceneEl.addEventListener('renderstart', () => {
      arSystem.start() // start AR
      setShowPreload(false)
    })
    sceneEl.addEventListener('arError', event => {
      document.querySelector('.error-screen').style.display = 'flex'
    })

    const target = document.querySelector('#target')
    target.addEventListener('targetFound', event => {
      console.log('found')
      setIsFound(true)
      play()
    })

    target.addEventListener('targetLost', event => {
      console.log('lost')
      setIsFound(false)
      pause()
    })
    return () => {
      arSystem.stop()
    }
  }, [])

  // window.onpageshow = function (event) {
  //   if (event.persisted) {
  //     window.location.reload()
  //   }
  // }

  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    const videos = document.querySelectorAll('video')

    videos.forEach(video => {
      video.muted = !isMuted
    })

    setIsMuted(!isMuted)
    console.log(isMuted)
  }

  const SoundButton = () => {
    return (
      <Box position="absolute" zIndex="1000" bottom="20px" right="30px">
        <IconButton onClick={toggleMute} size="large">
          {isMuted ? (
            <VolumeOff sx={{ color: 'white', fontSize: 40 }} />
          ) : (
            <VolumeUp sx={{ color: 'white', fontSize: 40 }} />
          )}
        </IconButton>
      </Box>
    )
  }

  return (
    <>
      <div className="error-screen">
        <div className="error-message">
          <div>
            <h3>
              <b>Something went wrong</b>
            </h3>
          </div>
          <div>
            <p>
              We're unable to access your device's camera. Try switching
              browsers, or follow these steps and then refresh the page:
            </p>
          </div>

          <div>
            <p>
              <b>On iPhone:</b>
              Open the Settings app → Scroll down and tap your browser icon →
              Flip switch next to "Camera"
            </p>
          </div>

          <div>
            <p>
              <b>On Android:</b>
              Open the Settings app → Scroll down and tap your browser icon →
              Tap Permissions → Flip switch next to "Camera"
            </p>
          </div>
          <div>
            <p>
              If that doesn't work,
              <a
                href="https://plynth.com/s/contact"
                target="_blank"
                rel="noreferrer"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <div id="reticle-container" className="hidden">
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <div id="reticle"></div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingTop: '2rem',
          }}
        >
          <img
            src={ScanInstructions}
            style={{ width: '40vw' }}
            alt="Scan Instructions"
          />
        </div>
      </div>

      <div id="reticle-container-loading" className="hidden">
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <div id="reticle">
            <div className="loader"></div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingTop: '2rem',
          }}
        >
          <img
            src={ScanInstructions}
            style={{ width: '40vw' }}
            alt="Scan Instructions"
          />
        </div>
      </div>

      {isFound && <SoundButton />}
      {showPreload && <LoadingScreen />}

      <Box position="relative" height={vh100} width="100vw" overflow="hidden">
        <a-scene
          ref={sceneRef}
          loading-screen="backgroundColor: black"
          mindar-image={`uiScanning: #reticle-container; uiLoading: #reticle-container-loading; imageTargetSrc: ${targetsUrl}; autoStart: false; `}
          color-space="sRGB"
          embedded
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
          <a-assets>
            <video
              id="asset"
              className="video"
              src={`${assetUrl}`}
              preload="auto"
              controls
              muted
              crossOrigin="anonymous"
              loop
              playsInline
            ></video>
          </a-assets>

          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

          <a-entity mindar-image-target="targetIndex: 0" id="target">
            <a-video
              src="#asset"
              id="asset-a"
              width="1"
              height="1.5"
              position="0 0 0"
              rotation="0 0 0"
            ></a-video>
          </a-entity>
        </a-scene>
        <video></video>
      </Box>
    </>
  )
}

export default ARPack
