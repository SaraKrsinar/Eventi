using Eventi.Application.Interfaces;
using Eventi.Domain.Entities;
using Eventi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Eventi.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly EventiDbContext _context;

    public TaskRepository(EventiDbContext context)
    {
        _context = context;
    }

    public async Task<EventTask> AddAsync(EventTask task)
    {
        await _context.EventTasks.AddAsync(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<List<EventTask>> GetTasksByEventIdAsync(Guid eventId)
    {
        return await _context.EventTasks
            .Where(t => t.EventId == eventId)
            .ToListAsync();
    }

    public async Task<EventTask?> GetByIdAsync(Guid id)
    {
        return await _context.EventTasks.FindAsync(id);
    }

    public async Task UpdateAsync(EventTask task)
    {
        _context.EventTasks.Update(task);
        await _context.SaveChangesAsync();
    }
}
