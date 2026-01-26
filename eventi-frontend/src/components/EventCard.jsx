import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const completedTasks = event.tasks?.filter(t => t.isCompleted).length || 0;
  const totalTasks = event.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      wedding: 'from-pink-400 to-rose-500',
      birthday: 'from-purple-400 to-pink-500',
      conference: 'from-blue-400 to-indigo-500',
    };
    return colors[type?.toLowerCase()] || 'from-pink-400 to-pink-600';
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'wedding':
        return '💒';
      case 'birthday':
        return '🎂';
      case 'conference':
        return '🎤';
      default:
        return '🎉';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-pink-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-pink-200">
      <div className={`h-2 bg-linear-to-r ${getEventTypeColor(event.eventType)}`}></div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-50 text-pink-600 border border-pink-100">
            <span className="mr-1">{getEventTypeIcon(event.eventType)}</span>
            {event.eventType}
          </span>
          <span className="text-sm text-gray-400">{formatDate(event.date)}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
          {event.name}
        </h3>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.city}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {event.guestCount} guests
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Tasks Progress</span>
            <span className="font-medium text-pink-600">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Link
          to={`/event/${event.id}`}
          className="block w-full text-center py-3 px-4 bg-linear-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-[1.02]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
