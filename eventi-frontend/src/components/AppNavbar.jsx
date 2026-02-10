import { Link, useLocation } from 'react-router-dom'
import './AppNavbar.css'

const AppNavbar = () => {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path

  return (
    <nav className="app-navbar">
      <div className="app-navbar-container">
        <Link to="/home" className="app-logo">
          Eventi
        </Link>

        <div className="app-navbar-actions">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link to="/create" className="create-btn">
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
