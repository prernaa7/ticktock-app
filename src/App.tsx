import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TimesheetDetail from './pages/TimesheetDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheet/:week" element={<TimesheetDetail />} />
      </Routes>
    </Router>
  );
}
