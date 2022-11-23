import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
export default function DisplayAccessibility({ setVisible }) {
  const { darkTheme } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  return (
    <div className='absolute_wrap'>
      <div className='absolute_wrap_header'>
        <div
          className='circle hover1'
          onClick={() => {
            setVisible(0)
          }}
        >
          <i className='arrow_back_icon'></i>
        </div>
        Display & Accessibility
      </div>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }}>
          <i className='dark_filled_icon'></i>
        </div>
        <div className='mmenu_col'>
          <span className='mmenu_span1'>Dark Mode</span>
          <span className='mmenu_span2'>
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label
        htmlFor='darkOff'
        className='hover1'
        onClick={() => {
          Cookies.set('darkTheme', false)
          dispatch({ type: 'darkTheme/light' })
        }}
      >
        <span>Off</span>
        {darkTheme ? (
          <input type='radio' name='dark' id='darkOff' />
        ) : (
          <input type='radio' name='dark' id='darkOff' checked readOnly />
        )}
      </label>
      <label
        htmlFor='darkOn'
        className='hover1'
        onClick={() => {
          Cookies.set('darkTheme', true)
          dispatch({ type: 'darkTheme/dark' })
        }}
      >
        <span>On</span>
        {darkTheme ? (
          <input type='radio' name='dark' id='darkOn' checked readOnly />
        ) : (
          <input type='radio' name='dark' id='darkOn' />
        )}
      </label>
      <div className='mmenu_main'>
        <div className='small_circle' style={{ width: '50px' }}>
          <i className='compact_icon'></i>
        </div>
        <div className='mmenu_col'>
          <span className='mmenu_span1'>Compact mode</span>
          <span className='mmenu_span2'>
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor='compactOff' className='hover1'>
        <span>Off</span>
        <input type='radio' name='compact' id='compactOff' />
      </label>
      <label htmlFor='compactOn' className='hover1'>
        <span>On</span>
        <input type='radio' name='compact' id='compactOn' />
      </label>
      <div className='mmenu_item hover3'>
        <div className='small_circle'>
          <i className='keyboard_icon'></i>
        </div>
        <span>Keyboard</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
    </div>
  )
}
