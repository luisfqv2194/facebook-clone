import { Form, Formik } from 'formik'
import { useState } from 'react'
import RegisterInput from '../inputs/registerInput'
import DateOfBirthSelect from './DateOfBirthSelect'
import * as Yup from 'yup'
import GenderSelect from './GenderSelect'
import DotLoader from 'react-spinners/ClipLoader'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/user/userSlice'

const RegisterForm = ({ setVisible }) => {
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  }
  const [user, setUser] = useState(userInfos)
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user
  const yearTemp = new Date().getFullYear()
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const years = Array.from(new Array(108), (val, index) => yearTemp - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate()
  }
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index)

  const registerValidationSchema = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, 'Fisrt name must be between 2 and 16 characters.')
      .max(16, 'Fisrt name must be between 2 and 16 characters.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Numbers and special characters are not allowed.'
      ),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Numbers and special characters are not allowed.'
      ),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  })
  const [dateError, setDateError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerSubmit = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { ...user }
      )
      setError('')
      setSuccess(data.message)
      setTimeout(() => {
        dispatch(login(data))
        Cookies.set('user', JSON.stringify(data))
        navigate('/')
      }, 2000)
    } catch (error) {
      setloading(false)
      setSuccess('')
      setError(error.response.data.message)
    }
  }

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i
            className='exit_icon'
            onClick={() => {
              setVisible(false)
            }}
          ></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidationSchema}
          onSubmit={() => {
            let currentDate = new Date()
            let pickedDate = new Date(bYear, bMonth - 1, bDay)
            let atLeast14 = new Date(1970 + 14, 0, 1)
            let noMoreThan70 = new Date(1970 + 70, 0, 1)
            if (currentDate - pickedDate < atLeast14) {
              setDateError('It looks like you are under 14')
            } else if (currentDate - pickedDate > noMoreThan70) {
              setDateError('It looks like you are over 70')
            } else if (gender === '') {
              setDateError('')
              setGenderError(
                'Please choose a gender. You can change who can see this later'
              )
            } else {
              setDateError('')
              setGenderError('')
              registerSubmit()
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Mobile number or email address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='New Password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                ></DateOfBirthSelect>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
              <DotLoader
                color={'#1876f2'}
                loading={loading}
                size={30}
                aria-label='Loading Spinner'
                data-testid='loader'
              />

              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm
