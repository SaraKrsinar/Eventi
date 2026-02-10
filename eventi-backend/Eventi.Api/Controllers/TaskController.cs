using Eventi.Application.DTOs;
using Eventi.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eventi.Api.Controllers;

[ApiController]
[Route("api")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpPost("events/{eventId:guid}/tasks")]
    public async Task<ActionResult<TaskResponse>> CreateTask(Guid eventId, [FromBody] CreateTaskRequest request)
    {
        var result = await _taskService.CreateTaskAsync(eventId, request);
        return CreatedAtAction(nameof(GetTasksByEventId), new { eventId }, result);
    }

    [HttpGet("events/{eventId:guid}/tasks")]
    public async Task<ActionResult<List<TaskResponse>>> GetTasksByEventId(Guid eventId)
    {
        var tasks = await _taskService.GetTasksByEventIdAsync(eventId);
        return Ok(tasks);
    }

    [HttpPatch("tasks/{taskId:guid}/complete")]
    public async Task<ActionResult<TaskResponse>> CompleteTask(Guid taskId)
    {
        var result = await _taskService.CompleteTaskAsync(taskId);
        if (result == null)
            return NotFound();

        return Ok(result);
    }
}
