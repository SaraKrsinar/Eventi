import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import CreateEvent from '../pages/CreateEvent';
import EventDetails from '../pages/EventDetails';
import TasksPage from '../pages/TasksPage';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event/:id/tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
