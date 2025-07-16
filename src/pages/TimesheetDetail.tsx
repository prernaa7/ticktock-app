import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { timesheets } from '../data/mockData';
import AddEntryModal from '../AddEntryModal';

export default function TimesheetDetail() {
  const { week } = useParams<{ week: string }>();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const projects = ['Project Name', 'Other Project'];
  const typesOfWork = ['Bug fixes', 'Feature development'];

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/timesheets/${week}`)
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load timesheet entries');
        setLoading(false);
      });
  }, [week]);

  const groupedByDay = entries.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {} as Record<string, any[]>);

  const totalHours = 20;
  const maxHours = 40;
  const progressPercent = (totalHours / maxHours) * 100;

  const weekNumber = Number(week);
  const weekData = timesheets.find(ts => ts.week === weekNumber);
  const weekDate = weekData ? weekData.date : '';

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
      <div className="px-2 py-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h2 className="text-xl font-bold text-black mb-2 md:mb-0">This week's timesheet</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-700 font-normal">{totalHours}/{maxHours} hrs</span>
                <div className="w-24 md:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="text-xs text-gray-500 font-normal">100%</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-6">{weekDate}</div>
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : Object.entries(groupedByDay).map(([day, dayTasks]) => {
                  const tasksArr = dayTasks as any[];
                  return (
                    <div key={day}>
                      <div className="text-gray-900 font-semibold mb-2">{day}</div>
                      <div className="space-y-2">
                        {tasksArr.filter((task) => task.task).map((task, index) => (
                          <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 p-2 rounded bg-gray-50">
                            <div className="flex-1 text-gray-900 font-normal">{task.task}</div>
                            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                              <span className="text-gray-700 text-sm">{task.hours} hrs</span>
                              <span className="text-blue-700 text-xs bg-blue-100 rounded-lg px-3 py-1 font-semibold">{task.project}</span>
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><circle cx="19.5" cy="12" r="1.5"/><circle cx="4.5" cy="12" r="1.5"/></svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          className="w-full border border-dashed border-blue-400 text-gray-500 py-2 rounded bg-white hover:bg-blue-50 hover:text-blue-600 font-normal mt-2"
                          onClick={() => setShowModal(true)}
                        >
                          + Add new task
                        </button>
                      </div>
                    </div>
                  );
                })
            }
            </div>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-sm p-4 text-center">
            <span className="text-sm text-gray-500 font-normal">© 2024 tentwenty. All rights reserved.</span>
          </div>
        </div>
      </div>
      {showModal && (
        <AddEntryModal
          projects={projects}
          typesOfWork={typesOfWork}
          onSubmit={entry => {
            setEntries(prev => [...prev, { ...entry, date: Object.keys(groupedByDay)[0] || 'Today' }]);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
