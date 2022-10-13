import { Form, Formik } from 'formik'
import { useState } from 'react'
import RegisterInput from '../inputs/registerInput'
import * as Yup from 'yup'
const RegisterForm = () => {
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
  console.log(user)
  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
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
                <div className='reg_grid'>
                  <select
                    name='bDay'
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => {
                      return (
                        <option value={day} key={'Day-Option-' + i}>
                          {day}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    name='bMonth'
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => {
                      return (
                        <option value={month} key={'Month-Option-' + i}>
                          {month}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    name='bYear'
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => {
                      return (
                        <option value={year} key={'Year-Option-' + i}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <label htmlFor='male'>
                    Male{' '}
                    <input
                      type='radio'
                      name='gender'
                      id='male'
                      value={'male'}
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor='female'>
                    Female{' '}
                    <input
                      type='radio'
                      name='gender'
                      id='female'
                      value={'Female'}
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor='Custom'>
                    Custom{' '}
                    <input
                      type='radio'
                      name='gender'
                      id='other'
                      value={'Other'}
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm
