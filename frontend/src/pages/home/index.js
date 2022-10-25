import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ref } from 'yup'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import useClickOutside from '../../helpers/clickOutside'

const Home = () => {
  const [visible, setVisible] = useState(true)
  const { user } = useSelector((user) => ({ ...user }))
  const el = useRef(null)
  useClickOutside(el, () => {
    setVisible(false)
  })
  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  )
}

export default Home
