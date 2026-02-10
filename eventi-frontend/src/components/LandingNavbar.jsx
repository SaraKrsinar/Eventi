import { Link } from 'react-router-dom'
import './LandingNavbar.css'

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <div className="landing-navbar-container">
        <span className="landing-logo">Eventi</span>

        <Link to="/dashboard" className="open-app-btn">
          Open App
        </Link>
      </div>
    </nav>
  )
}

export default LandingNavbar
