import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header'
import './style.css'
import Cover from './Cover'
import ProfielPictureInfos from './ProfielPictureInfos'
import ProfileMenu from './ProfileMenu'
export default function Profile() {
  const { username } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }))
  var userName = username === undefined ? user.username : username
  const { profile } = useSelector((state) => ({
    ...state,
  }))
  useEffect(() => {
    getProfile()
  }, [userName])
  const getProfile = async () => {
    try {
      dispatch({
        type: 'profile/profile_request',
      })
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (data.ok === false) {
        navigate('/profile')
      } else {
        dispatch({
          type: 'profile/profile_success',
          payload: data,
        })
      }
    } catch (error) {
      dispatch({
        type: 'profile/profile_error',
        payload: error.response.data.message,
      })
    }
  }
  return (
    <div className='profile'>
      <Header page='profile' />
      <div className='profile_top'>
        <div className='profile_container'>
          <Cover cover={profile.profile.cover} />
          <ProfielPictureInfos profile={profile.profile} />
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}
