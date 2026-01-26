namespace Eventi.Domain.Entities;

public class Event
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string EventType { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string City { get; set; } = string.Empty;
    public int GuestCount { get; set; }
    public decimal Budget { get; set; }
    public List<EventTask> Tasks { get; set; } = new();
}
