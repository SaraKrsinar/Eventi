import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEvents } from '../api/eventsApi'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import './Dashboard.css'

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-card">
          <h3>Connection Error</h3>
          <p>{error}</p>
          <span>Make sure the backend is running</span>
        </div>
      </div>
    )
  }

  const totalTasks = events.reduce(
    (acc, e) => acc + (e.tasks?.length || 0),
    0
  )

  const completedTasks = events.reduce(
    (acc, e) => acc + (e.tasks?.filter(t => t.isCompleted).length || 0),
    0
  )

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <header className="dashboard-header">
          <h1>
            Welcome to <span>Eventi</span>
          </h1>
          <p>
            Manage your events, track tasks, and stay in control.
          </p>
        </header>

        <section className="dashboard-stats">
          <div className="stat-card pink">
            <p>Total Events</p>
            <strong>{events.length}</strong>
          </div>

          <div className="stat-card purple">
            <p>Total Tasks</p>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card green">
            <p>Completed Tasks</p>
            <strong>{completedTasks}</strong>
          </div>
        </section>

        <section className="dashboard-events-header">
          <h2>Your Events</h2>
          <Link to="/create" className="btn-primary">
            + Create New Event
          </Link>
        </section>

        {events.length === 0 ? (
          <div className="dashboard-empty">
            <h3>No events yet</h3>
            <p>Start planning your first event.</p>
            <Link to="/create" className="btn-primary">
              Create Event
            </Link>
          </div>
        ) : (
          <div className="dashboard-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
