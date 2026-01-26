namespace Eventi.Application.Interfaces;

public interface IEventTemplateService
{
    List<string> GetDefaultTasksForEventType(string eventType);
}
