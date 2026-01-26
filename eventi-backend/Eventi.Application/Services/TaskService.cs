using Eventi.Application.DTOs;
using Eventi.Application.Interfaces;
using Eventi.Domain.Entities;

namespace Eventi.Application.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskResponse> CreateTaskAsync(Guid eventId, CreateTaskRequest request)
    {
        var task = new EventTask
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            IsCompleted = false,
            EventId = eventId
        };

        await _taskRepository.AddAsync(task);

        return MapToResponse(task);
    }

    public async Task<List<TaskResponse>> GetTasksByEventIdAsync(Guid eventId)
    {
        var tasks = await _taskRepository.GetTasksByEventIdAsync(eventId);
        return tasks.Select(MapToResponse).ToList();
    }

    public async Task<TaskResponse?> CompleteTaskAsync(Guid taskId)
    {
        var task = await _taskRepository.GetByIdAsync(taskId);
        if (task == null)
            return null;

        task.IsCompleted = true;
        await _taskRepository.UpdateAsync(task);

        return MapToResponse(task);
    }

    private static TaskResponse MapToResponse(EventTask task)
    {
        return new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted
        };
    }
}
