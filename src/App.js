// import './App.sass';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const myEventsList = [
  {
    id:'School', 
    title:'test on math',
    allDay: true,
    start: '2022-08-07T04:00:00.000Z',
    end:'2022-08-07T05:00:00.000Z',
  }, 
  {
    id:'Soccer', 
    title: 'practice at 6pm',
    allDay: true,
    start: '2022-08-09T07:00:00.000Z',
    end:'2022-08-09T09:00:00.000Z',
  }
]

const localizer = momentLocalizer(moment)
const MyCalendar = props => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}

export default MyCalendar;
