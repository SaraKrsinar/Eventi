import { EVENT_TYPES } from '../config/eventTypes'

export const getEventTypeData = (type) => {
  if (!type) return EVENT_TYPES.Other

  return (
    EVENT_TYPES[type] ||
    Object.values(EVENT_TYPES).find(
      (eventType) => eventType.key === type.toLowerCase()
    ) ||
    EVENT_TYPES.Other
  )
}

export const getAllEventTypes = () => Object.values(EVENT_TYPES)
