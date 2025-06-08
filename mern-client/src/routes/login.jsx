import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/user/json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setMessage('Login successful! 🥭');
        navigate({ to: '/profile', state: { user: foundUser } });
      } else {
        setMessage('Invalid credentials 🥭');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Server error 🥭');
    }
  };

  return (
    <div>
      <h1>Login Page 🥭</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4 max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
