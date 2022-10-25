import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ref } from 'yup'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import './style.css'
const Home = () => {
  const { user } = useSelector((user) => ({ ...user }))
  return (
    <div className='home'>
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
      </div>
      <RightHome user={user} />
    </div>
  )
}

export default Home
