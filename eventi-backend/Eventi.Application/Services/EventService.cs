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

    public async Task<EventResponse?> UpdateEventAsync(Guid id, UpdateEventRequest request)
    {
        var eventEntity = await _eventRepository.GetByIdAsync(id);
        if (eventEntity == null)
            return null;

        eventEntity.Name = request.Name;
        eventEntity.EventType = request.EventType;
        eventEntity.Date = request.Date;
        eventEntity.City = request.City;
        eventEntity.GuestCount = request.GuestCount;
        eventEntity.Budget = request.Budget;

        await _eventRepository.UpdateAsync(eventEntity);
        return MapToResponse(eventEntity);
    }

    public async Task<bool> DeleteEventAsync(Guid id)
    {
        var eventEntity = await _eventRepository.GetByIdAsync(id);
        if (eventEntity == null)
            return false;

        await _eventRepository.DeleteAsync(id);
        return true;
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
