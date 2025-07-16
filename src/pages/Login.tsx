import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        const err = await res.json();
        setError(err.error || 'Invalid login credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError('');
    };
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4 md:p-8">
        <div className="flex flex-grow items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4"
          >
            <h2 className="text-2xl font-bold text-black mb-2">Welcome back</h2>
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">{error}</div>
            )}
            <div>
              <label className="block text-sm mb-1 text-gray-700 font-normal">Email</label>
              <input
                className="w-full border p-2 rounded"
                placeholder="name@example.com"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700 font-normal">Password</label>
              <input
                className="w-full border p-2 rounded"
                placeholder="••••••••••"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input id="remember" type="checkbox" className="accent-blue-600" />
              <label htmlFor="remember" className="text-sm text-gray-700 font-normal">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <footer className="text-sm text-gray-500 text-center mt-4 font-normal">
          © 2024 Tentwenty
        </footer>
      </div>
      <div className="w-full md:w-1/2 bg-blue-600 text-white flex items-center justify-center p-4 md:p-8">
        <div className="max-w-lg text-left mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">ticktock</h1>
          <p className="whitespace-pre-line text-base text-white font-normal leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application designed
            to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
