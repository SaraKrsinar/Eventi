namespace Eventi.Domain.Entities;

public class EventTask
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public Guid EventId { get; set; }
    public Event? Event { get; set; }
}
