const API_BASE_URL = 'http://localhost:5231/api';

export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const getEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
};

export const createEvent = async (data) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};
