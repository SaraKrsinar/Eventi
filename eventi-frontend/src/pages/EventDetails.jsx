import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvent } from '../api/eventsApi';
import Loader from '../components/Loader';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'wedding': return '💒';
      case 'birthday': return '🎂';
      case 'conference': return '🎤';
      default: return '🎉';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
        <Loader />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-pink-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Not Found</h3>
          <p className="text-gray-500 mb-4">{error || 'The event you are looking for does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completedTasks = event.tasks?.filter(t => t.isCompleted).length || 0;
  const totalTasks = event.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-pink-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mb-8">
          <div className="h-3 bg-linear-to-r from-pink-400 to-pink-600"></div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-200">
                  {getEventTypeIcon(event.eventType)}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full mb-2">
                    {event.eventType}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-pink-600 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="text-gray-800 font-semibold text-sm">{formatDate(event.date)}</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-pink-600 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-gray-800 font-semibold">{event.city}</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-pink-600 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Guests</span>
                </div>
                <p className="text-gray-800 font-semibold">{event.guestCount}</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-pink-600 mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Budget</span>
                </div>
                <p className="text-gray-800 font-semibold">{formatCurrency(event.budget)}</p>
              </div>
            </div>

            <div className="bg-linear-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Task Progress</h3>
                <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-linear-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{completedTasks} completed</span>
                <span>{totalTasks - completedTasks} remaining</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/event/${event.id}/tasks`}
                className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Manage Tasks
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="p-6 border-b border-pink-100">
            <h2 className="text-xl font-bold text-gray-800">Tasks Overview</h2>
          </div>
          <div className="p-6">
            {event.tasks && event.tasks.length > 0 ? (
              <div className="space-y-3">
                {event.tasks.slice(0, 5).map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      task.isCompleted ? 'bg-green-50' : 'bg-pink-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.isCompleted ? 'bg-green-500' : 'bg-pink-200'
                    }`}>
                      {task.isCompleted ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      )}
                    </div>
                    <span className={`font-medium ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
                {event.tasks.length > 5 && (
                  <Link
                    to={`/event/${event.id}/tasks`}
                    className="block text-center text-pink-600 hover:text-pink-700 font-medium py-2"
                  >
                    View all {event.tasks.length} tasks →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
