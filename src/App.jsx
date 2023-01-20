import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Card from './components/UI/Card'
import useAxios from './hooks/useAxios'
import SliderModal from './components/UI/SliderModal'
import CustomParticles from './components/UI/CustomParticles'

function App() {
   // useAxios custom hook makes GET request to NASA Mars Photos API
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=n6Kv7lRc8yGAH9i8zT5MKGQA0mJOpPwDK1lpmBmO`,
  })

  const [photos, setPhotos] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const handleClose = () => setIsModalVisible(false)
  const showModal = () => setIsModalVisible(true)

  useEffect(() => {
    console.log(response)
    if (!!response) setPhotos(response.data.photos)
  }, [response])
  return (
    <div className='app container d-flex flex-column align-items-center justify-content-center pt-4'>
      <SliderModal
        isModalVisible={isModalVisible}
        handleClose={handleClose}
        selectedPhoto={selectedPhoto}
        photos={photos}
      />

      <header>
        <h1>Mars Photos Explorer</h1>
      </header>
      {loading && <h2 className='loading-heading'>Loading photos...</h2>}
      {error && <h2 className='error-heading'>There was an error loading photos: {error.message} </h2>}
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {!loading &&
          !error &&
          !!photos &&
          photos.map((photo, index) => {
            return (
              <Card
                key={`photo_${index}`}
                photoData={photo}
                showModal={showModal}
                setSelectedPhoto={setSelectedPhoto}
                index={index}
              />
            )
          })}
      </div>
      <CustomParticles />
    </div>
  )
}

export default App
