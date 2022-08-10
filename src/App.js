// import './App.sass';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar'
import Grid from '@mui/material/Grid';
import {useState} from 'react'
import Button from '@mui/material/Button';

const myEventsList = [
  {
    id:'School', 
    title:'test on math',
    allDay: true,
    start: '2022-08-08T04:00:00.000Z',
    end:'2022-08-08T05:00:00.000Z',
  }, 
  {
    id:'Soccer', 
    title: 'practice at 6pm',
    allDay: true,
    start: '2022-08-09T07:00:00.000Z',
    end:'2022-08-09T09:00:00.000Z',
  }
]

const XComponent = () => {
  return <>X</>
}

const localizer = momentLocalizer(moment)
const MyCalendar = props => {
  const [currentlySelected, setCurrentlySelected] = useState(null)
  const handleDeselect = (e) => {
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
      <Grid item  xs={10} className='calendar'>
        <Calendar
          localizer={localizer}
          events={
            currentlySelected ? 
            myEventsList.filter(e => e.id === currentlySelected)
            : myEventsList
          }
          components={{
            eventWrapper: XComponent
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
