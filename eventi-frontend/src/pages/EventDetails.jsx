import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getEvent, deleteEvent } from '../api/eventsApi'
import DynamicIcon from '../components/DynamicIcon'
import { getEventTypeData } from '../utils/getEventTypeData'
import Loader from '../components/Loader'
import './EventDetails.css'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this event?')) return
    await deleteEvent(id)
    navigate('/dashboard')
  }

  if (loading) return <Loader />
  if (!event) return <p>Event not found</p>

  const { label, icon } = getEventTypeData(event.eventType)

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <Link to="/dashboard" className="back-link">
          ← Back
        </Link>

        <div className="event-card">
          <div className="event-header">
            <DynamicIcon name={icon} className="event-icon" />
            <div>
              <span className="event-type">{label}</span>
              <h1>{event.name}</h1>
            </div>
          </div>

          <div className="event-info-grid">
            <span>Date</span>
            <span>{event.date?.split('T')[0]}</span>

            <span>City</span>
            <span>{event.city}</span>

            <span>Guests</span>
            <span>{event.guestCount}</span>

            <span>Budget</span>
            <span>€{event.budget}</span>
          </div>

          <div className="event-actions">
            <Link to={`/event/${id}/edit`} className="btn-edit">
              Edit event
            </Link>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
