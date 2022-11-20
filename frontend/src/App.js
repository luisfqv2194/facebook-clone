import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import LoggedInRoutes from './routes/LoggedInRoutes'
import NotLoggedInRoutes from './routes/NotLoggedInRoutes'
import Activate from './pages/home/activate'
import Friends from './pages/friends/'
import Reset from './pages/reset'
import CreatePostPopup from './components/createPostPopup'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  const { posts } = useSelector((state) => ({
    ...state,
  }))
  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'posts/posts_request',
      })
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
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
  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <div>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts.posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path='/profile'
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path='/profile/:username'
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path='/friends'
            element={<Friends setVisible={setVisible} />}
            exact
          />
          <Route
            path='/friends/:type'
            element={<Friends setVisible={setVisible} />}
            exact
          />
          <Route
            path='/'
            element={
              <Home
                setVisible={setVisible}
                posts={posts.posts}
                loading={posts.loading}
              />
            }
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
