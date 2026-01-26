using Eventi.Application.Interfaces;
using Eventi.Application.Services;
using Eventi.Infrastructure.Data;
using Eventi.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Eventi API",
        Version = "v1",
        Description = "Event Planning and Task Management API"
    });
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configure SQLite Database
builder.Services.AddDbContext<EventiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? "Data Source=eventi.db"));

// Register Repositories
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

// Register Services
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IEventTemplateService, EventTemplateService>();

var app = builder.Build();

// Apply migrations and seed data on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EventiDbContext>();
    db.Database.Migrate();
    
    // Seed example events if database is empty
    await SeedDataAsync(scope.ServiceProvider);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Eventi API v1");
        c.RoutePrefix = string.Empty; // Swagger at root
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();

// Seed data method
static async Task SeedDataAsync(IServiceProvider serviceProvider)
{
    var eventService = serviceProvider.GetRequiredService<IEventService>();
    var eventRepository = serviceProvider.GetRequiredService<IEventRepository>();
    
    var existingEvents = await eventRepository.GetAllAsync();
    if (existingEvents.Count > 0)
        return; // Data already seeded

    // Seed Wedding Event
    await eventService.CreateEventAsync(new Eventi.Application.DTOs.CreateEventRequest
    {
        Name = "Sarah & John's Wedding",
        EventType = "Wedding",
        Date = DateTime.Now.AddMonths(6),
        City = "New York",
        GuestCount = 150,
        Budget = 25000
    });

    // Seed Birthday Event
    await eventService.CreateEventAsync(new Eventi.Application.DTOs.CreateEventRequest
    {
        Name = "Emma's 30th Birthday",
        EventType = "Birthday",
        Date = DateTime.Now.AddMonths(2),
        City = "Los Angeles",
        GuestCount = 50,
        Budget = 3000
    });

    // Seed Conference Event
    await eventService.CreateEventAsync(new Eventi.Application.DTOs.CreateEventRequest
    {
        Name = "Tech Summit 2024",
        EventType = "Conference",
        Date = DateTime.Now.AddMonths(4),
        City = "San Francisco",
        GuestCount = 500,
        Budget = 75000
    });
}
