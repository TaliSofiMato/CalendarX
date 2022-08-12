// import './App.sass';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar'
import Grid from '@mui/material/Grid';
import { useCallback, useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'

const myEventsList = [
  {
    id: 'School',
    title: 'test on math',
    allDay: true,
    start: '2022-08-08T04:00:00.000Z',
    end: '2022-08-08T05:00:00.000Z',
  },
  {
    id: 'School',
    title: 'test on chemistry',
    allDay: true,
    start: '2022-08-16T04:00:00.000Z',
    end: '2022-08-16T05:00:00.000Z',
  },
  {
    id: 'Soccer',
    title: 'practice',
    allDay: true,
    start: '2022-08-09T07:00:00.000Z',
    end: '2022-08-09T09:00:00.000Z',
  },
  {
    id: 'Soccer',
    title: 'practice',
    allDay: true,
    start: '2022-08-13T07:00:00.000Z',
    end: '2022-08-13T09:00:00.000Z',
  },
  {
    id: 'Soccer',
    title: 'practice',
    allDay: true,
    start: '2022-08-17T07:00:00.000Z',
    end: '2022-08-17T09:00:00.000Z',
  },
  {
    id: 'Soccer',
    title: 'practice',
    allDay: true,
    start: '2022-08-19T07:00:00.000Z',
    end: '2022-08-19T09:00:00.000Z',
  },
  {
    id: 'Meal prep',
    title: 'spagetti',
    allDay: true,
    start: '2022-08-15T07:00:00.000Z',
    end: '2022-08-15T09:00:00.000Z',
  },
  {
    id: 'Meal prep',
    title: 'egg muffins',
    allDay: true,
    start: '2022-08-21T07:00:00.000Z',
    end: '2022-08-21T09:00:00.000Z',
  },
  {
    id: 'Meal prep',
    title: 'lasagna',
    allDay: true,
    start: '2022-08-29T07:00:00.000Z',
    end: '2022-08-29T09:00:00.000Z',
  },
  {
    id: 'Service Dog app',
    title: 'work on app',
    allDay: true,
    start: '2022-08-25T07:00:00.000Z',
    end: '2022-08-25T09:00:00.000Z',
  },
  {
    id: 'Service Dog app',
    title: 'work on app',
    allDay: true,
    start: '2022-08-27T07:00:00.000Z',
    end: '2022-08-27T09:00:00.000Z',
  },
  {
    id: 'Service Dog app',
    title: 'work on app',
    allDay: true,
    start: '2022-08-11T07:00:00.000Z',
    end: '2022-08-11T09:00:00.000Z',
  }, {
    id: 'Service Dog app2',
    title: 'work on app2',
    allDay: true,
    checked: false,
    start: '2022-08-11T07:00:00.000Z',
    end: '2022-08-11T09:00:00.000Z',
  }
]




const localizer = momentLocalizer(moment)
const MyCalendar = props => {
  const [currentlySelected, setCurrentlySelected] = useState(null)
  const [checkboxChecked, setCheckboxChecked] = useState([])

  const XComponent = () => {
      return <div className='x-component'>X</div>
  }


  const checkboxComponent = useCallback((props) => {
    return (
      <>
        <input type="checkbox" name={props.event.id} onChange={(e) => {handleCheckbox(e, props.event)}} />
        <>{props.children}</>
      </>
    )
  }, [])

  const handleCheckbox = (e, event) => {
    if (e.target.checked) {
      let copy = [...checkboxChecked]
      copy.push(event)
      setCheckboxChecked(copy)
    }
  }

  const handleDeselect = (e) => {
    debugger
    setCurrentlySelected(null)
  }
  const handleSelect = (value) => {
    setCurrentlySelected(value)
  }
  return (
    <Grid container spacing={2} className='container'>
      <Grid item xs={2} className='sidebar'>
        <Sidebar
          handleSelect={handleSelect}
          handleDeselect={handleDeselect}
          currentlySelected={currentlySelected}
        />
      </Grid>
      <Grid item xs={10} className='calendar'>
        <Calendar
          localizer={localizer}
          onSelectEvent={(e) => { handleCheckbox(e, props.event) }}
          events={currentlySelected 
              ? checkboxChecked.filter(e => e.id === currentlySelected)
              : myEventsList
          }
          components={{
            eventWrapper: currentlySelected 
              ? XComponent
              : checkboxComponent
          }}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}

        />
      </Grid>
    </Grid>
  )
}

export default MyCalendar;
