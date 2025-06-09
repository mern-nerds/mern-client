import React, { useEffect, useState } from "react";

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      setUser(null);
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((users) => {
        const match = users.find((u) => u.email === parsedUser.email);
        if (!match || !match.isAdmin) {
          setUser(null);
          window.location.href = "/profile";
          return;
        }

        setUser(match);
        setAllUsers(users);
      })
      .catch((err) => setError("Error fetching users: " + err.message));
  }, []);

  const toggleAdminStatus = (_id, currentStatus) => {
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAdmin: !currentStatus }),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          const text = await res.text();
          throw new Error("Unexpected response: " + text);
        }
        return res.json();
      })
      .then((updatedUser) => {
        setAllUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
      })
      .catch((err) => setError("Failed to update admin status: " + err.message));
  };

  const deleteUser = (_id) => {
    if (!window.confirm(`Delete user? This cannot be undone.`)) return;

    fetch(`http://localhost:5000/user/${_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setAllUsers((prev) => prev.filter((u) => u._id !== _id));
      })
      .catch((err) => setError("Failed to delete user: " + err.message));
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditForm({ name: user.name, email: user.email, password: "" });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditForm({ name: "", email: "", password: "" });
  };

  const submitEdit = () => {
    fetch(`http://localhost:5000/user/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setAllUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
        cancelEditing();
      })
      .catch((err) => setError("Update failed: " + err.message));
  };

  if (user === undefined) return <p>Loading admin panel...</p>;
  if (user === null) return <p>Access denied. Redirecting...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="mb-6">
        <strong>Logged in as:</strong> {user.name} ({user.email})
      </p>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((u) => (
            <tr key={u._id} className="border-t">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "✅" : "❌"}</td>
              <td className="space-x-2">
                <button 
                  onClick={() => toggleAdminStatus(u._id, u.isAdmin)} 
                  className={`px-2 py-1 rounded text-white ${
                    u.isAdmin ? "bg-red-600" : "bg-green-500"
                  }`}
                >
                  {u.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
                <button onClick={() => startEditing(u)} className="bg-yellow-400 px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => deleteUser(u._id)} className="bg-red-600 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUserId && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Edit User</h3>
          <input
            placeholder="Name"
            className="block mb-2 p-1 border rounded w-full"
            value={editForm.name}
            onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            placeholder="Email"
            className="block mb-2 p-1 border rounded w-full"
            value={editForm.email}
            onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="password"
            placeholder="New password"
            className="block mb-2 p-1 border rounded w-full"
            value={editForm.password}
            onChange={(e) => setEditForm((f) => ({ ...f, password: e.target.value }))}
          />
          <div className="space-x-2">
            <button onClick={submitEdit} className="bg-blue-600 text-white px-4 py-1 rounded">
              Save
            </button>
            <button onClick={cancelEditing} className="bg-gray-400 px-4 py-1 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        className="mt-6 bg-black text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("loggedInUser");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}