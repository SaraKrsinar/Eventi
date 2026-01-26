import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-[150px] font-bold bg-linear-to-r from-pink-300 to-pink-500 bg-clip-text text-transparent leading-none">
              404
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-linear-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 animate-bounce">
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to planning amazing events!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-xl border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Event
          </Link>
        </div>

        <div className="mt-16 flex justify-center space-x-4 opacity-50">
          <div className="w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
