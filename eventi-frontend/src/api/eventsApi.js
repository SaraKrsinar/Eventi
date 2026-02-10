const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getEvents = async () => {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch events')
  return response.json()
}

export const getEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Event not found')
  return response.json()
}

export const createEvent = async (data) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Failed to create event')
  return response.json()
}

export const updateEvent = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Failed to update event')
  return response.json()
}

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) throw new Error('Failed to delete event')
}
