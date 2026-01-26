using Eventi.Application.DTOs;

namespace Eventi.Application.Interfaces;

public interface ITaskService
{
    Task<TaskResponse> CreateTaskAsync(Guid eventId, CreateTaskRequest request);
    Task<List<TaskResponse>> GetTasksByEventIdAsync(Guid eventId);
    Task<TaskResponse?> CompleteTaskAsync(Guid taskId);
}
