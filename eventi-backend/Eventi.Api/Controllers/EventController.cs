using Eventi.Application.DTOs;
using Eventi.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eventi.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    /// <summary>
    /// Creates a new event and automatically generates default tasks based on event type.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<EventResponse>> CreateEvent([FromBody] CreateEventRequest request)
    {
        var result = await _eventService.CreateEventAsync(request);
        return CreatedAtAction(nameof(GetEventById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Returns all events with their tasks.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<EventResponse>>> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(events);
    }

    /// <summary>
    /// Returns a single event with its tasks.
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EventResponse>> GetEventById(Guid id)
    {
        var eventResponse = await _eventService.GetEventByIdAsync(id);
        if (eventResponse == null)
            return NotFound();

        return Ok(eventResponse);
    }
}
