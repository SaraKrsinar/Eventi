using Eventi.Domain.Entities;

namespace Eventi.Application.Interfaces;

public interface ITaskRepository
{
    Task<EventTask> AddAsync(EventTask task);
    Task<List<EventTask>> GetTasksByEventIdAsync(Guid eventId);
    Task<EventTask?> GetByIdAsync(Guid id);
    Task UpdateAsync(EventTask task);
}
