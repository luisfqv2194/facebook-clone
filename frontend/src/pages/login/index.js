import './style.css'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/login/LoginForm'
import Footer from '../../components/login/Footer'
import RegisterForm from '../../components/login/RegisterForm'
const Login = () => {
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm></LoginForm>
        <RegisterForm />
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Login
