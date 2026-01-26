using Eventi.Application.DTOs;

namespace Eventi.Application.Interfaces;

public interface IEventService
{
    Task<EventResponse> CreateEventAsync(CreateEventRequest request);
    Task<List<EventResponse>> GetAllEventsAsync();
    Task<EventResponse?> GetEventByIdAsync(Guid id);
}
