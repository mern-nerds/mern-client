import { useRouterState } from '@tanstack/react-router';

export default function Profile() {
  const { location } = useRouterState();
  const user = location.state?.user;

  if (!user) {
    return <p>No user data found. Please log in 🥭</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">User Profile 🥭</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p>
      <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}
