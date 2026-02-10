import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, updateEvent, getEvent } from '../api/eventsApi'
import { getAllEventTypes } from '../utils/getEventTypeData'
import DynamicIcon from '../components/DynamicIcon'
import './CreateEvent.css'

const getSubmitButtonText = (loading, isEdit) => {
  if (loading) return isEdit ? 'Saving...' : 'Creating...'
  return isEdit ? 'Save Changes' : 'Create Event'
}

const CreateEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    eventType: 'wedding',
    date: '',
    city: '',
    guestCount: '',
    budget: '',
  })

  const eventTypes = getAllEventTypes()

  useEffect(() => {
    if (!isEdit) return

    setLoading(true)
    getEvent(id)
      .then((event) => {
        setFormData({
          name: event.name || '',
          eventType: event.eventType || 'wedding',
          date: event.date ? event.date.split('T')[0] : '',
          city: event.city || '',
          guestCount: event.guestCount || '',
          budget: event.budget || '',
        })
      })
      .catch(() => setError('Failed to load event'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload = {
        ...formData,
        guestCount: Number(formData.guestCount),
        budget: Number(formData.budget),
      }

      const result = isEdit
        ? await updateEvent(id, payload)
        : await createEvent(payload)

      navigate(`/event/${result.id}`)
    } catch (err) {
      setError(err.message || 'Failed to save event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <form onSubmit={handleSubmit} className="create-event-form">
          <h1>{isEdit ? 'Edit Event' : 'Create Event'}</h1>

          {error && <p className="form-error">{error}</p>}

          <input
            name="name"
            placeholder="Event name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            name="guestCount"
            type="number"
            placeholder="Guest count"
            value={formData.guestCount}
            onChange={handleChange}
          />

          <input
            name="budget"
            type="number"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
          />
          <div className="event-types">
            {eventTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    eventType: type.key,
                  }))
                }
                className={`event-type ${formData.eventType === type.key ? 'active' : ''
                  }`}
              >
                <DynamicIcon name={type.icon} className="event-type-icon" />
                <span className="event-type-label">{type.label}</span>
              </button>
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {getSubmitButtonText(loading, isEdit)}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
