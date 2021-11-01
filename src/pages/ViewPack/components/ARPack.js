import React, { useEffect, useRef, useState } from 'react'
import 'mind-ar/dist/mindar-image.prod.js'
import 'aframe'
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import './ARPack.css'
import { Box } from '@mui/material'

const ARPack = ({ pack }) => {
  const { assetUrl, targetsUrl } = pack.cards[0]
  const sceneRef = useRef(null)
  // let activeEntity = null
  // let targetsFound = 0

  useEffect(() => {
    const sceneEl = sceneRef.current
    const arSystem = sceneEl.systems['mindar-image-system']
    sceneEl.addEventListener('renderstart', () => {
      arSystem.start() // start AR
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

  // const [isMuted, setIsMuted] = useState(true)

  // const toggleMute = () => {
  //   const videos = document.querySelectorAll('video')

  //   console.log(isMuted)

  //   videos.forEach(video => {
  //     video.muted = !isMuted
  //   })

  //   setIsMuted(!isMuted)
  // }

  // document.addEventListener('DOMContentLoaded', function () {
  // const target = document.querySelector('#target')

  // const sceneEl = document.querySelector('a-scene')

  // sceneEl.addEventListener('arError', event => {
  //   document.querySelector('.error-screen').style.display = 'flex'
  // })

  // const targetFound = elementId => {
  // if (activeEntity !== null) {
  // pause(activeEntity)
  // }

  // console.log('found')

  // play()

  // if (activeEntity !== elementId) {
  //   activeEntity = elementId
  // }

  // targetsFound = targetsFound + 1
  //
  // document.querySelector('.player-container').style.display = 'flex'
  // }

  // const targetLost = elementId => {
  // targetsFound = targetsFound - 1

  // if (targetsFound === 0) {
  // document.querySelector('.player-container').style.display = 'none'
  // }

  // pause()

  // activeEntity = null
  // }

  // target.addEventListener('targetFound', event => {
  //   console.log('found')
  //   play()
  // })

  // target.addEventListener('targetLost', event => {
  //   console.log('lost')
  //   pause()
  // })
  // })

  return (
    <Box position="relative" height="100vh" width="100vw" overflow="hidden">
      {/* <div className="error-screen">
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
              <a href="https://plynth.com/s/contact" target="_blank">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="player-container">
        <div class="more-button-div">
          <div
            style={{
              flex: '0 0 100%',
              color: '#ffffffaa',
              textAlign: 'center',
              paddingBottom: '4px',
            }}
          >
            <i class="fas fa-chevron-up"></i>
          </div>
          <div style={{ flex: '0 0 100%', textAlign: 'center' }}>
            <button class="more-button" onclick="openPack()">
              <b>GET MORE</b>
            </button>
          </div>
        </div>

        <button className="sound-button" onClick={toggleMute}>
          {isMuted ? (
            <div id="muted-button">
              <i className="fas fa-volume-mute"></i>
            </div>
          ) : (
            <div id="unmuted-button">
              <i className="fas fa-volume-down"></i>
            </div>
          )}
        </button>
      </div> */}

      {/* <div id="reticle-container" className="hidden">
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
          <img src="/scan-instruction.svg" style="width: 40vw" />
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
          <img src="/scan-instruction.svg" style="width: 40vw" />
        </div>
      </div> */}
      <a-scene
        ref={sceneRef}
        loading-screen="backgroundColor: black"
        mindar-image={`imageTargetSrc: ${targetsUrl}; autoStart: false; `}
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
  )
}

export default ARPack
