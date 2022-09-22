import { ErrorMessage, useField } from 'formik'
import './style.css'
export default function LoginInput({ ...props }) {
  const [field, meta] = useField(props)
  return (
    <div className='input_wrap'>
      {meta.touched && meta.error && !props.bottom ? (
        <div className='input_error' style={{ transform: 'translateY(3px)' }}>
          <ErrorMessage name={field.name} />
          <div className='error_arrow_top'></div>
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
        <div className='input_error' style={{ transform: 'translateY(1px)' }}>
          <ErrorMessage name={field.name} />
          <div className='error_arrow_bottom'></div>
        </div>
      ) : (
        ''
      )}
      {meta.touched && meta.error ? (
        <i
          className='error_icon'
          style={{ top: `${!props.bottom && '63%'}` }}
        ></i>
      ) : (
        ''
      )}
    </div>
  )
}
