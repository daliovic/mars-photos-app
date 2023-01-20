import React from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'

export default function SliderModal({ isModalVisible, handleClose, selectedPhoto, photos }) {
  return (
    <Modal show={isModalVisible} onHide={handleClose} size='xl' centered>
      <div data-testid='slider' className='slider-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Photos slider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel defaultActiveIndex={selectedPhoto}>
            {!!photos &&
              photos.map((photo, index) => {
                return (
                  <Carousel.Item key={`carousel_photo_${index}`}>
                    <img className='d-block w-100' src={photo.img_src} />
                    <Carousel.Caption>
                      <h3>Taken on: {photo.earth_date}</h3>
                      <p>
                        Camera: {photo.camera.full_name} | Rover: {photo.rover.name}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
