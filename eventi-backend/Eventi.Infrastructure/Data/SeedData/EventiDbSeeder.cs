using Eventi.Application.DTOs;
using Eventi.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Eventi.Infrastructure.Data.SeedData;

public static class EventiDbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var eventService = scope.ServiceProvider.GetRequiredService<IEventService>();
        var eventRepository = scope.ServiceProvider.GetRequiredService<IEventRepository>();

        var existingEvents = await eventRepository.GetAllAsync();
        if (existingEvents.Any())
            return;

        await eventService.CreateEventAsync(new CreateEventRequest
        {
            Name = "Sample Wedding Event",
            EventType = "Wedding",
            Date = DateTime.Now.AddMonths(3),
            City = "Demo City",
            GuestCount = 120,
            Budget = 20000
        });

        await eventService.CreateEventAsync(new CreateEventRequest
        {
            Name = "Demo Tech Conference",
            EventType = "Conference",
            Date = DateTime.Now.AddMonths(5),
            City = "Innovation Hub",
            GuestCount = 300,
            Budget = 50000
        });
    }
}
