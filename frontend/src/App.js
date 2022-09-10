import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App
