using Eventi.Application.Interfaces;
using Eventi.Domain.Entities;
using Eventi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Eventi.Infrastructure.Repositories;

public class EventRepository : IEventRepository
{
    private readonly EventiDbContext _context;

    public EventRepository(EventiDbContext context)
    {
        _context = context;
    }

    public async Task<Event> AddAsync(Event eventEntity)
    {
        await _context.Events.AddAsync(eventEntity);
        await _context.SaveChangesAsync();
        return eventEntity;
    }

    public async Task<List<Event>> GetAllAsync()
    {
        return await _context.Events
            .Include(e => e.Tasks)
            .ToListAsync();
    }

    public async Task<Event?> GetByIdAsync(Guid id)
    {
        return await _context.Events
            .Include(e => e.Tasks)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task UpdateAsync(Event eventEntity)
    {
        _context.Events.Update(eventEntity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var eventEntity = await _context.Events.FindAsync(id);
        if (eventEntity != null)
        {
            _context.Events.Remove(eventEntity);
            await _context.SaveChangesAsync();
        }
    }
}
