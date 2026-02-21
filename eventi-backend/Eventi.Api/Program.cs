using Eventi.Application.Interfaces;
using Eventi.Application.Services;
using Eventi.Infrastructure.Data;
using Eventi.Infrastructure.Data.SeedData;
using Eventi.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "https://eventi-nine.vercel.app",
                "http://localhost:5173",
                "http://localhost:5174"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<EventiDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=EventiDB.db"
    )
);

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IEventTemplateService, EventTemplateService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<EventiDbContext>();
    db.Database.Migrate();
    await EventiDbSeeder.SeedAsync(scope.ServiceProvider);
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Eventi API v1");
    c.RoutePrefix = string.Empty;
});

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
