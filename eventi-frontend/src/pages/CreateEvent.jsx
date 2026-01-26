import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/eventsApi';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    eventType: 'Wedding',
    date: '',
    city: '',
    guestCount: '',
    budget: ''
  });

  const eventTypes = [
    { value: 'Wedding', icon: '💒', color: 'from-pink-400 to-rose-500' },
    { value: 'Birthday', icon: '🎂', color: 'from-purple-400 to-pink-500' },
    { value: 'Conference', icon: '🎤', color: 'from-blue-400 to-indigo-500' },
    { value: 'Party', icon: '🎉', color: 'from-yellow-400 to-orange-500' },
    { value: 'Other', icon: '✨', color: 'from-pink-400 to-pink-600' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        ...formData,
        guestCount: parseInt(formData.guestCount),
        budget: parseFloat(formData.budget)
      };
      
      const result = await createEvent(eventData);
      navigate(`/event/${result.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create New <span className="bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Event</span>
          </h1>
          <p className="text-gray-500">Fill in the details to start planning your event</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="h-2 bg-linear-to-r from-pink-400 to-pink-600"></div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Sarah & John's Wedding"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, eventType: type.value }))}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.eventType === type.value
                        ? 'border-pink-400 bg-pink-50 shadow-md'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{type.icon}</span>
                    <span className="text-xs font-medium text-gray-600">{type.value}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="e.g., New York"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 150"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 25000"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-200 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-pink-700 font-medium">Auto-generated Tasks</p>
                  <p className="text-xs text-pink-600 mt-1">
                    Based on your event type, we'll automatically create a list of recommended tasks to help you plan your event.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Event...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
