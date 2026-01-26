const API_BASE_URL = 'http://localhost:5231/api';

export const getTasks = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (eventId, data) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const completeTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to complete task');
  }
  return response.json();
};
