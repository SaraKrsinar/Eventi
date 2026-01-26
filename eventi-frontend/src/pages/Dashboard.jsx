import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api/eventsApi';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-pink-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <p className="text-sm text-gray-400">Make sure the backend is running on http://localhost:5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Eventi</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Plan and manage your events with ease. Create beautiful events and track your tasks effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">
                  {events.reduce((acc, e) => acc + (e.tasks?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Tasks</p>
                <p className="text-2xl font-bold text-gray-800">
                  {events.reduce((acc, e) => acc + (e.tasks?.filter(t => t.isCompleted).length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Events</h2>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-pink-100 shadow-sm">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-6">Start planning your first event today!</p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
