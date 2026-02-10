import { Link } from 'react-router-dom'
import DynamicIcon from './DynamicIcon'
import { getEventTypeData } from '../utils/getEventTypeData'
import './EventCard.css'

const EventCard = ({ event }) => {
  const completedTasks = event.tasks?.filter(t => t.isCompleted).length || 0
  const totalTasks = event.tasks?.length || 0
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0

  const { label, icon } = getEventTypeData(event.eventType)

  return (
    <div className="event-card">
      <div className="event-card-body">
        <div className="event-card-header">
          <span className="event-type-badge">
            <DynamicIcon name={icon} className="w-4 h-4" />
            {label}
          </span>
          <span className="event-date">
            {new Date(event.date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="event-title">{event.name}</h3>

        <div className="event-meta">
          <span>{event.city}</span>
          <span>{event.guestCount} guests</span>
        </div>

        <div className="event-progress">
          <div className="progress-header">
            <span>Tasks Progress</span>
            <span>{completedTasks}/{totalTasks}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Link to={`/event/${event.id}`} className="event-card-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard
