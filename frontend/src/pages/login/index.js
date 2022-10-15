import './style.css'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/login/LoginForm'
import Footer from '../../components/login/Footer'
import RegisterForm from '../../components/login/RegisterForm'
import { useState } from 'react'
const Login = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible}></LoginForm>
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Login
