import { useMediaQuery } from 'react-responsive'

export default function DateOfBirthSelect(props) {
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
      style={{ marginBottom: `${props.dateError && !view3 ? '90px' : '0'}` }}
    >
      <select
        name='bDay'
        value={props.bDay}
        onChange={props.handleRegisterChange}
      >
        {props.days.map((day, i) => {
          return (
            <option value={day} key={'Day-Option-' + i}>
              {day}
            </option>
          )
        })}
      </select>
      <select
        name='bMonth'
        value={props.bMonth}
        onChange={props.handleRegisterChange}
      >
        {props.months.map((month, i) => {
          return (
            <option value={month} key={'Month-Option-' + i}>
              {month}
            </option>
          )
        })}
      </select>
      <select
        name='bYear'
        value={props.bYear}
        onChange={props.handleRegisterChange}
      >
        {props.years.map((year, i) => {
          return (
            <option value={year} key={'Year-Option-' + i}>
              {year}
            </option>
          )
        })}
      </select>

      {props.dateError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {props.dateError}
        </div>
      )}
    </div>
  )
}
