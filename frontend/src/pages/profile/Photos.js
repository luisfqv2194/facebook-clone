import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Photos({ username, token }) {
  const dispatch = useDispatch()
  const { photos } = useSelector((state) => ({
    ...state,
  }))
  useEffect(() => {
    getPhotos()
  }, [username])
  const path = `${username}/*`
  const max = 30
  const sort = 'desc'

  const getPhotos = async () => {
    try {
      dispatch({
        type: 'photos/photos_request',
      })
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      dispatch({
        type: 'photos/photos_success',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: 'photos/photos_error',
        payload: error.response.data.message,
      })
    }
  }
  console.log('---->', photos.photos)
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>
        Photos
        <div className='profile_header_link'>See all photos</div>
      </div>
      <div className='profile_card_count'>
        {photos.photos.total_count === 0
          ? ''
          : photos.photos.total_count === 1
          ? '1 Photo'
          : `${photos.photos.total_count} photos`}
      </div>
      <div className='profile_card_grid'>
        {photos.photos.resources &&
          photos.photos.resources.slice(0, 9).map((img) => (
            <div className='profile_photo_card' key={img.public_id}>
              <img src={img.secure_url} alt='' />
            </div>
          ))}
      </div>
    </div>
  )
}
