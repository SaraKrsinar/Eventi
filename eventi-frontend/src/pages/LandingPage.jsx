import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-root">

      <section className="landing-hero">
        <h1>
          Plan your events.
          <span>Enjoy the moments.</span>
        </h1>

        <p>
          Eventi is a fast and simple event planning platform that helps you
          organize every detail of your event without stress or overwhelming pressure.
        </p>

        <div className="landing-actions">
          <Link to="/dashboard" className="btn-primary">
            Start planning
          </Link>

          <Link to="/how-it-works" className="btn-secondary">
            See how it works
          </Link>

        </div>
      </section>

      <section className="section">
        <h2 className="section-title">
          What is <span>Eventi</span>?
        </h2>

        <p className="section-text">
          Eventi turns ideas into organized plans, so you can focus on the joy
          of the event and not the chaos behind it.
        </p>

        <div className="features">
          {[
            {
              title: 'Create events easily',
              description:
                'Set up your event in minutes with a clean and intuitive flow — no unnecessary steps.',
            },
            {
              title: 'Smart task planning',
              description:
                'Automatically generate and manage tasks tailored to your specific event type.',
            },
            {
              title: 'Stay in control',
              description:
                'Track progress at a glance and always know what’s done and what’s next.',
            },
          ].map(({ title, description }) => (
            <div key={title} className="feature-card">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="final-section">
        <h2>Start planning your next event today</h2>

        <Link to="/dashboard" className="btn-primary">
          Create your first event
        </Link>

        <p>
          It only takes a few minutes.
        </p>
      </section>
    </div>
  )
}

export default LandingPage
