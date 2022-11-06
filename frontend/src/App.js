import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import LoggedInRoutes from './routes/LoggedInRoutes'
import NotLoggedInRoutes from './routes/NotLoggedInRoutes'
import Activate from './pages/home/activate'
import Reset from './pages/reset'
import CreatePostPopup from './components/createPostPopup'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
// function reducer(state, action) {
//   switch (action.type) {
//     case 'POSTS_REQUEST':
//       return { ...state, loading: true, error: '' }
//     case 'POSTS_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: '',
//       }
//     case 'POSTS_ERROR':
//       return { ...state, loading: false, error: action.payload }

//     default:
//       return state
//   }
// }
function App() {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  const { posts } = useSelector((state) => ({
    ...state,
  }))
  useEffect(() => {
    getAllPosts()
  }, [])
  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'posts/posts_request',
      })
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      dispatch({
        type: 'posts/posts_success',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: 'posts/posts_error',
        payload: error.response.data.message,
      })
    }
  }
  // console.log(nana, loading, error)
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/profile' element={<Profile />} exact />
          <Route
            path='/'
            element={<Home setVisible={setVisible} posts={posts.posts} />}
            exact
          />
          <Route path='/activate/:token' element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </div>
  )
}

export default App
