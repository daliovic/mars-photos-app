import React from 'react'
import MagGlassAnimation from '../Animations/MagGlassAnimation'

export default function Card({ photoData, showModal, index, setSelectedPhoto }) {
  const handleShow = () => {
    setSelectedPhoto(index)
    showModal()
  }
  return (
    <div className='col' onClick={handleShow} data-testid={`photo-card-${index}`}>
      <div className='card h-100'>
        <div className='image-container position-relative'>
          <MagGlassAnimation></MagGlassAnimation>
          <img src={photoData.img_src} className='card-img-top object-fit-cover' alt='...' />
        </div>
        <div className='card-body'>
          <p className='card-text fw-bolder'>Taken on: {photoData.earth_date}</p>
        </div>
      </div>
    </div>
  )
}
