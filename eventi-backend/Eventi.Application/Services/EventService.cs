using Eventi.Application.DTOs;
using Eventi.Application.Interfaces;
using Eventi.Domain.Entities;

namespace Eventi.Application.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly ITaskRepository _taskRepository;
    private readonly IEventTemplateService _templateService;

    public EventService(
        IEventRepository eventRepository,
        ITaskRepository taskRepository,
        IEventTemplateService templateService)
    {
        _eventRepository = eventRepository;
        _taskRepository = taskRepository;
        _templateService = templateService;
    }

    public async Task<EventResponse> CreateEventAsync(CreateEventRequest request)
    {
        var eventEntity = new Event
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            EventType = request.EventType,
            Date = request.Date,
            City = request.City,
            GuestCount = request.GuestCount,
            Budget = request.Budget
        };

        await _eventRepository.AddAsync(eventEntity);

        // Generate default tasks based on event type
        var defaultTasks = _templateService.GetDefaultTasksForEventType(request.EventType);
        foreach (var taskTitle in defaultTasks)
        {
            var task = new EventTask
            {
                Id = Guid.NewGuid(),
                Title = taskTitle,
                IsCompleted = false,
                EventId = eventEntity.Id
            };
            await _taskRepository.AddAsync(task);
            eventEntity.Tasks.Add(task);
        }

        return MapToResponse(eventEntity);
    }

    public async Task<List<EventResponse>> GetAllEventsAsync()
    {
        var events = await _eventRepository.GetAllAsync();
        return events.Select(MapToResponse).ToList();
    }

    public async Task<EventResponse?> GetEventByIdAsync(Guid id)
    {
        var eventEntity = await _eventRepository.GetByIdAsync(id);
        return eventEntity == null ? null : MapToResponse(eventEntity);
    }

    private static EventResponse MapToResponse(Event eventEntity)
    {
        return new EventResponse
        {
            Id = eventEntity.Id,
            Name = eventEntity.Name,
            EventType = eventEntity.EventType,
            Date = eventEntity.Date,
            City = eventEntity.City,
            GuestCount = eventEntity.GuestCount,
            Budget = eventEntity.Budget,
            Tasks = eventEntity.Tasks.Select(t => new TaskResponse
            {
                Id = t.Id,
                Title = t.Title,
                IsCompleted = t.IsCompleted
            }).ToList()
        };
    }
}
