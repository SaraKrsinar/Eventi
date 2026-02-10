import { Outlet } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar />
      <main className="pt-24">
        <Outlet />
      </main>
    </>
  )
}

export default LandingLayout
