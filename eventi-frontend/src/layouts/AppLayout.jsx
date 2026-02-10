import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'

const AppLayout = () => {
  return (
    <>
      <AppNavbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
