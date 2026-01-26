using Eventi.Domain.Entities;

namespace Eventi.Application.Interfaces;

public interface IEventRepository
{
    Task<Event> AddAsync(Event eventEntity);
    Task<List<Event>> GetAllAsync();
    Task<Event?> GetByIdAsync(Guid id);
    Task UpdateAsync(Event eventEntity);
    Task DeleteAsync(Guid id);
}
