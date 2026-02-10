import { Link } from 'react-router-dom'
import './HowItWorks.css'

const steps = [
    {
        number: '01',
        title: 'Create an event',
        text: 'Choose the event type, date, location, and number of guests.',
    },
    {
        number: '02',
        title: 'Get your task plan',
        text: 'Eventi automatically creates tasks based on your event.',
    },
    {
        number: '03',
        title: 'Track progress',
        text: 'See what’s completed and what still needs attention.',
    },
    {
        number: '04',
        title: 'Enjoy the moment',
        text: 'With everything organized, you can focus on the event itself.',
    },
]

const HowItWorks = () => {
    return (
        <div className="how-root">
            <section className="how-hero">
                <h1>How Eventi works</h1>
                <p>
                    A simple, calm process designed to guide you from idea to execution.
                </p>
            </section>

            <section className="how-steps">
                {steps.map((step) => (
                    <div key={step.number} className="how-step">
                        <span>{step.number}</span>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                    </div>
                ))}
            </section>

            <section className="how-cta">
                <h2>Ready to start?</h2>
                <Link to="/dashboard" className="btn-primary">
                    Create your first event
                </Link>
            </section>
        </div>
    )
}

export default HowItWorks
