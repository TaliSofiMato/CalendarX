import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar'
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react'
import './App.css'

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
    dates.push(new Date(d));
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
  const [newEventType, setNewEventType] = useState(null)
  const [newEvent, setNewEvent] = useState(null)
  const [disabled, setDisabled] = useState(true)


  useEffect(() => {
    const getEventTypes = async () => {
      let response = await fetch('https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/event-types')
      response = await response.json()
      response = response.map((et) => { et.data = JSON.parse(et.data); return et })
      setEventTypes(response)
    }
    getEventTypes()
  }, [newEventType])

  useEffect(() => {
    const getAllEvents = async () => {
      let response
      try {
        response = await fetch('https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events')
        response = await response.json()
      } catch (e) {
        console.log(e.response.status)
        response = e.response
      }
      setEvents(response)
      setCheckboxChecked(response.map(r => r.data))
    }

    getAllEvents()
  }, [newEvent])

  useEffect(() => {
    let eventCheckboxes = []
    eventTypes.forEach((et) => {
      let dates = []
      et.data.dayIndexes.forEach((dayIndex) => {
        let days = getDates(dayIndex)
        let mapped = days.map(d => { const dateString = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; return ({start: dateString, end: dateString, title: et.data.title}) })
        dates = [...dates, ...mapped]
      })
      eventCheckboxes = [...eventCheckboxes, ...dates]
    })
    setCheckboxes(eventCheckboxes)
  }, [eventTypes])

  const postEvent = async (e) => {
    let response
    try {
      response = await fetch(`https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events`, {
        method: 'post', 
        body: JSON.stringify(
          {
            title: e.title,
            start: e.start,
            end: e.end,
          }
        )
      })
      setNewEvent(response)
    } catch (e) {
      console.log(e.response.status)
      response = e.response
    }
  }

  const deleteEvent = async (id) => {
    
    let response
    try {
      response = await fetch(`https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/events/${id}`, {
        method: 'delete'
      })
    } catch (e) {
      console.error(e)
    }
    return response
    
  }

  // const deleteEventType = async (id) => {
  //   let response
  //   try {
  //     response = await fetch(`https://ixrapevm31.execute-api.us-east-1.amazonaws.com/dev/event-types/${id}`, {
  //       method: 'delete'
  //     })
  //   } catch (e) {
  //     console.error(e)
  //   }
  //   return response
  // }

  const XComponent = () => {
    return <div className='x-component'>X</div>
  }

  const determineIfChecked = (checkbox) => {
    const found = events.find((e) => {
      return (e.data?.title === checkbox.title) &&
        (new Date(e.data.start).getDate() === new Date(checkbox.start).getDate())
    })

    return checkboxChecked.includes(checkbox) || found
  }

  const checkboxComponent = (props) => {
    let isDisabled = new Date(props.event.start) > new Date()
    const isChecked = determineIfChecked(props.event)
    return (
      <>
        <input
          type="checkbox"
          checked={isChecked}
          name={props.event.id}
          onChange={(e) => { handleCheckbox(e, props.event) }}
          disabled={isDisabled}
        />
        <>{props.children}</>
      </>
    )
  }

  const handleCheckbox = async (e, event) => {
    let copy = [...events]
    if (e.target.checked) {
      // copy.push(event)
      // setCheckboxChecked(copy)
      await postEvent(event)
    } else {
      let found = copy.find((e) => { 
        return (e.data.start === event.start)
            && (e.data.end === event.end)
            && (e.data.title === event.title)
      })
      // let foundIndex = copy.indexOf(found)
      // copy.splice(foundIndex, 1)
      // setCheckboxChecked(copy)

      await deleteEvent(found.sk)
    }
  }

  const handleDeselect = (e) => {
    setDisabled(true)
    setCurrentlySelected(null)
  }

  const handleSelect = (value) => {
    setDisabled(false)
    setCurrentlySelected(value)
  }
  // const handleDeleteEventType = async (e) => {

  //   debugger
  //   await deleteEventType()
  // }

  return (
    <Grid container spacing={2} className='container'>
      <Grid item xs={2} className='sidebar'>
        <Sidebar
          updateEventTypes={setNewEventType}
          handleSelect={handleSelect}
          handleDeselect={handleDeselect}
          currentlySelected={currentlySelected}
          eventTypes={eventTypes.map(e => e.data.title)}
          disabled={disabled}
          // handleDeleteEventType={handleDeleteEventType}
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
