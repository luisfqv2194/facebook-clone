import { ErrorMessage, useField } from 'formik'
import './style.css'
import { useMediaQuery } from 'react-responsive'
export default function RegisterInput({ ...props }) {
  const [field, meta] = useField(props)
  const desktopView = useMediaQuery({
    query: '(min-width: 850px)',
  })
  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !props.bottom ? (
        <div
          className={desktopView ? 'input_error_desktop' : 'input_error'}
          style={{ transform: 'translateY(3px)' }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
          ></div>
        </div>
      ) : (
        ''
      )}
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && props.bottom ? (
        <div
          className={desktopView ? 'input_error_desktop' : 'input_error'}
          style={{ transform: 'translateY(1px)' }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? 'error_arrow_left' : 'error_arrow_bottom'}
          ></div>
        </div>
      ) : (
        ''
      )}
      {meta.touched && meta.error ? (
        <i
          className='error_icon'
          style={{ top: `${!props.bottom && !desktopView ? '63%' : '15px'}` }}
        ></i>
      ) : (
        ''
      )}
    </div>
  )
}
