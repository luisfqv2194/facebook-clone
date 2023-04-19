import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../../components/createPost'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import SendVerification from '../../components/home/sendVerification'
import Post from '../../components/post'
import './style.css'
export default function Home({ setVisible, posts, loading }) {
  const { user } = useSelector((user) => ({ ...user }))
  const middle = useRef(null)
  const [height, setHeight] = useState()
  useEffect(() => {
    if (middle.current.clientHeight > height) {
      setHeight(middle.current.clientHeight)
    }
  }, [loading, height])
  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <Header page='home' />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className='posts'>
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  )
}
