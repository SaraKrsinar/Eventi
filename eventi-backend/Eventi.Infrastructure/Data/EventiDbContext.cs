using Eventi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Eventi.Infrastructure.Data;

public class EventiDbContext : DbContext
{
    public EventiDbContext(DbContextOptions<EventiDbContext> options) : base(options)
    {
    }

    public DbSet<Event> Events { get; set; } = null!;
    public DbSet<EventTask> EventTasks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.EventType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.City).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Budget).HasColumnType("decimal(18,2)");

            entity.HasMany(e => e.Tasks)
                  .WithOne(t => t.Event)
                  .HasForeignKey(t => t.EventId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<EventTask>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Title).IsRequired().HasMaxLength(200);
        });
    }
}
