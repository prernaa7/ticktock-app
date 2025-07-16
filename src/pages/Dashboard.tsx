import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const statusStyles: Record<string, string> = {
  COMPLETED: 'bg-green-200 text-green-800',
  INCOMPLETE: 'bg-yellow-200 text-yellow-800',
  MISSING: 'bg-pink-200 text-pink-800',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [timesheets, setTimesheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/timesheets')
      .then(res => res.json())
      .then(data => {
        setTimesheets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load timesheets');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="w-full bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold text-black">ticktock</span>
          <nav>
            <span className="text-sm text-black font-normal">Timesheets</span>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 font-normal">John Doe</span>
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </header>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">Your Timesheets</h2>
        <div className="bg-white rounded-lg shadow-sm p-2 md:p-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left text-gray-700 font-normal text-sm">WEEK #</th>
                    <th className="p-2 text-left text-gray-700 font-normal text-sm">DATE</th>
                    <th className="p-2 text-left text-gray-700 font-normal text-sm">STATUS</th>
                    <th className="p-2 text-left text-gray-700 font-normal text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheets.map(ts => (
                    <tr key={ts.week} className="border-t last:border-b">
                      <td className="p-2 text-black text-sm font-normal">{ts.week}</td>
                      <td className="p-2 text-black text-sm font-normal">{ts.date}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[ts.status]}`}>{ts.status}</span>
                      </td>
                      <td className="p-2">
                        <Link to={`/timesheet/${ts.week}`} className="text-blue-600 underline text-sm font-normal">
                          {ts.status === 'MISSING' ? 'Create' : ts.status === 'INCOMPLETE' ? 'Update' : 'View'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4 text-center">
          <span className="text-sm text-gray-500 font-normal">© 2024 tentwenty. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
