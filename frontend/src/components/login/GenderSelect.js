import { useMediaQuery } from 'react-responsive'

export default function GenderSelect(props) {
  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  })
  const view2 = useMediaQuery({
    query: '(min-width: 850px)',
  })
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  })
  return (
    <div
      className='reg_grid'
      style={{ marginBottom: `${props.genderError && !view3 ? '90px' : '0'}` }}
    >
      <label htmlFor='male'>
        Male{' '}
        <input
          type='radio'
          name='gender'
          id='male'
          value={'male'}
          onChange={props.handleRegisterChange}
        />
      </label>
      <label htmlFor='female'>
        Female{' '}
        <input
          type='radio'
          name='gender'
          id='female'
          value={'Female'}
          onChange={props.handleRegisterChange}
        />
      </label>
      <label htmlFor='Custom'>
        Custom{' '}
        <input
          type='radio'
          name='gender'
          id='other'
          value={'Other'}
          onChange={props.handleRegisterChange}
        />
      </label>
      {props.genderError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {props.genderError}
        </div>
      )}
    </div>
  )
}
