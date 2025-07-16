import { http, HttpResponse } from 'msw';

const users = [{ email: 'john@example.com', password: '123456' }];
const timesheets = [
  { week: 1, date: '1 - 5 January, 2024', status: 'COMPLETED' },
  { week: 2, date: '8 - 12 January, 2024', status: 'COMPLETED' },
  { week: 3, date: '15 - 19 January, 2024', status: 'INCOMPLETE' },
  { week: 4, date: '22 - 26 January, 2024', status: 'COMPLETED' },
  { week: 5, date: '28 January - 1 February, 2024', status: 'MISSING' },
];
const tasks = {
  4: [
    { date: 'Jan 21', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 21', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 22', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 22', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 22', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 23', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 23', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 23', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 24', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 24', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 24', task: 'Homepage Development', hours: 4, project: 'Project Name' },
    { date: 'Jan 25', task: '', hours: 0, project: '' },
  ],
};

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return HttpResponse.json({ token: 'dummy-token' }, { status: 200 });
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),
  http.get('/api/timesheets', () => {
    return HttpResponse.json(timesheets, { status: 200 });
  }),
  http.get('/api/timesheets/:week', ({ params }) => {
    const { week } = params;
    return HttpResponse.json(tasks[week] || [], { status: 200 });
  }),
  http.get('/api/ping', () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
]; 