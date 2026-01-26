using Eventi.Application.Interfaces;

namespace Eventi.Application.Services;

public class EventTemplateService : IEventTemplateService
{
    public List<string> GetDefaultTasksForEventType(string eventType)
    {
        return eventType.ToLower() switch
        {
            "wedding" => new List<string>
            {
                "Book venue",
                "Hire photographer",
                "Order wedding cake",
                "Choose decorations",
                "Book DJ / band"
            },
            "birthday" => new List<string>
            {
                "Choose location",
                "Order birthday cake",
                "Prepare decorations",
                "Send invitations"
            },
            "conference" => new List<string>
            {
                "Book conference hall",
                "Prepare agenda",
                "Invite speakers",
                "Arrange catering"
            },
            _ => new List<string>
            {
                "Define event goals",
                "Create guest list",
                "Set budget",
                "Choose venue",
                "Plan timeline"
            }
        };
    }
}
