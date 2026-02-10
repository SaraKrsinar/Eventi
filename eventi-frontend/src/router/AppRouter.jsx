import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingLayout from '../layouts/LandingLayout'
import AppLayout from '../layouts/AppLayout'
import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'
import CreateEvent from '../pages/CreateEvent'
import EventDetails from '../pages/EventDetails'
import EventChecklist from '../pages/EventChecklist'
import HowItWorks from '../pages/HowItWorks'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route element={<LandingLayout />}>
          <Route path="/home" element={<LandingPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event/:id/checklist" element={<EventChecklist />} />
          <Route path="/event/:id/edit" element={<CreateEvent />} />

          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
