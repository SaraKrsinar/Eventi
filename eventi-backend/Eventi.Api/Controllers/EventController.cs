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

    [HttpPost]
    public async Task<ActionResult<EventResponse>> CreateEvent([FromBody] CreateEventRequest request)
    {
        var result = await _eventService.CreateEventAsync(request);
        return CreatedAtAction(nameof(GetEventById), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<ActionResult<List<EventResponse>>> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(events);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EventResponse>> GetEventById(Guid id)
    {
        var eventResponse = await _eventService.GetEventByIdAsync(id);
        if (eventResponse == null)
            return NotFound();

        return Ok(eventResponse);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<EventResponse>> UpdateEvent(
        Guid id,
        [FromBody] UpdateEventRequest request)
    {
        var updated = await _eventService.UpdateEventAsync(id, request);
        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        var deleted = await _eventService.DeleteEventAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
