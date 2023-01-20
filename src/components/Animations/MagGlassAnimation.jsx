import React, { useRef } from 'react'
import Lottie from 'react-lottie'
import magAnim from '../../assets/MagGlassAnimation.json'

export default function MagGlassAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: magAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const ref = useRef(null)

  return (
    <div className='mag-glass-container'>
      <Lottie options={defaultOptions} ref={ref} />
    </div>
  )
}
