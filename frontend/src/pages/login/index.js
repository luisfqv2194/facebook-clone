import './style.css'
import React from 'react'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import LoginInput from '../../components/inputs/loginInput'
import * as Yup from 'yup'
const Login = () => {
  const loginInfo = {
    email: '',
    password: '',
  }
  const [login, setLogin] = useState(loginInfo)
  const { email, password } = login

  const handleLoginChange = (event) => {
    const { name, value } = event.target
    setLogin({ ...loginInfo, [name]: value })
  }

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email')
      .max(100),
    password: Yup.string().required('Password is required'),
  })
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <div className='login_wrap'>
          <div className='login_1'>
            <img src='../../icons/facebook.svg' alt='' />
            <span>
              Facebook helps you connect and share with the people in your life
            </span>
          </div>
          <div className='login_2'>
            <div className='login_2_wrap'>
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      type={'text'}
                      name={'email'}
                      placeholder='Email Address or Phone Number'
                      onChange={handleLoginChange}
                      bottom={false}
                    ></LoginInput>
                    <LoginInput
                      type={'password'}
                      name={'password'}
                      placeholder={'Password'}
                      onChange={handleLoginChange}
                      bottom={true}
                    ></LoginInput>
                    <button type='submit' className='blue_btn'>
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to={'/forgot'} className='forgot_password'>
                Forgotten password?
              </Link>
              <div className='sign_splitter'></div>
              <button className='blue_btn open_signup'>Create Account</button>
            </div>
            <Link to='/' className='sign_extra'>
              <b>Create a Page </b>
              for a celabrity, brand or business
            </Link>
          </div>
        </div>
        <div className='register'></div>
      </div>
    </div>
  )
}

export default Login
