// import './App.sass';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar'
import Grid from '@mui/material/Grid';
import { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'
import { DateRange } from '@mui/icons-material';
import {getAllEvents, postEvent} from './APIs'

// Gets all the dates of the month for a particular weekday (Mon, Tues, etc)
// based on its weekday index (0-6)
const getDates = (dayIndex) => {
  var d = new Date(),
      month = d.getMonth(),
      dates = [];

  // Set d to the 1st day of the month
  d.setDate(1);

  // Get the first of this weekday in the month
  while (d.getDay() !== dayIndex) {
      d.setDate(d.getDate() + 1);
  }

  // Get all the others of this weekday in the month
  while (d.getMonth() === month) {
      dates.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
  }

  return dates;
}

const localizer = momentLocalizer(moment)
const MyCalendar = props => {
  const [currentlySelected, setCurrentlySelected] = useState(null)
  const [checkboxChecked, setCheckboxChecked] = useState([])
  const [eventTypes, setEventTypes] = useState([])
  const [checkboxes, setCheckboxes] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEventTypes = async () => {
      let response = await fetch('https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/event-types')
      response = await response.json()
      response = response.map((et) => { et.data = JSON.parse(et.data); return et})
      setEventTypes(response)
    }
    getEventTypes()
  }, [])

  useEffect(() => {
    const getAllEvents = async () =>{
      let response
      try{
        response = await fetch('https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events')
        response = await response.json()
      } catch (e){
        console.log(e.response.status)
        response = e.response
      }
      setEvents(response)
    }

    getAllEvents()
  }, [])

  useEffect(() => {
    let eventCheckboxes = []
    eventTypes.forEach((e) => {
      let dates = []
      e.data.days.forEach((d, i) => {
        let days = getDates(i)
        let mapped = days.map(d => { return {id: e.id, title: e.data.title, start: d, end: d} })
        dates = [...dates, ...mapped]
      })
      eventCheckboxes = [...eventCheckboxes, ...dates]
    })
    setCheckboxes(eventCheckboxes)
  }, [eventTypes])

  const postEvent = async (e) => {
    let response
    try{
      response = await fetch(`https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events`, {method: 'post', body: JSON.stringify(e)})
    } catch (e){
      console.log(e.response.status)
      response = e.response
    }
  }



  const XComponent = () => {
    return <div className='x-component'>X</div>
  }

  const determineIfChecked = (event) => {
    const found = events.find((e) => {
      return (e.id === event.id) && 
      (new Date(e.start).getDate() === new Date(event.start).getDate())
    })

    return checkboxChecked.includes(event) || found
  }
  
  const checkboxComponent = (props) => {
    let isDisabled = new Date(props.event.start) > new Date()
    const isChecked = determineIfChecked(props.event)
    return (
      <>
        <input 
          type="checkbox" 
          checked={determineIfChecked(props.event)} 
          name={props.event.id} 
          onChange={(e) => {handleCheckbox(e, props.event)}} 
          disabled={isDisabled}
        />
        <>{props.children}</>
      </>
    )
  }

  const handleCheckbox = async (e, event) => {
    let copy = [...checkboxChecked]
    if (e.target.checked) {
      copy.push(event)
      setCheckboxChecked(copy)
      await postEvent(event)
    } else {
      let found = copy.find((e) => {return e === event})
      let foundIndex =copy.indexOf(found)
      copy.splice(foundIndex,1)
      setCheckboxChecked(copy)
    }
  }

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
          eventTypes={eventTypes.map(e => e.data.title)}
        />
      </Grid>
      <Grid item xs={10} className='calendar'>
        <Calendar
          style={{ height: '1500px' }}
          localizer={localizer}
          onSelectEvent={(e) => { handleCheckbox(e, props.event) }}
          events={currentlySelected 
              ? checkboxChecked.filter(e => e.title === currentlySelected)
              : checkboxes
          }
          components={{
            eventWrapper: currentlySelected 
              ? XComponent
              : checkboxComponent
          }}
          startAccessor="start"
          endAccessor="end"
        />
      </Grid>
    </Grid>
  )
}

export default MyCalendar;
