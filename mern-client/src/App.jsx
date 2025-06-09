// src/App.jsx
import { Outlet, Link } from '@tanstack/react-router';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> | <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link> | <Link to="/about">About</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App; // Make sure this line exists exactly like this