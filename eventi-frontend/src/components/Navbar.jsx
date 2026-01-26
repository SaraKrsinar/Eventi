import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-linear-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 group-hover:shadow-pink-300 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Eventi
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </span>
            </Link>

            <Link
              to="/create"
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isActive('/create')
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                  : 'bg-linear-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg hover:shadow-pink-200 hover:scale-105'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Event</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
