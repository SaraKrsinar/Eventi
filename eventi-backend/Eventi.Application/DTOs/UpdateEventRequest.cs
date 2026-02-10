namespace Eventi.Application.DTOs;

public class UpdateEventRequest
{
    public string Name { get; set; } = string.Empty;
    public string EventType { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string City { get; set; } = string.Empty;
    public int GuestCount { get; set; }
    public decimal Budget { get; set; }
}
