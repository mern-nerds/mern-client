import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      setUser(null); // no one logged in
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    fetch("http://localhost:5000/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((allUsers) => {
        const match = allUsers.find((u) => u.email === parsedUser.email);
        if (match) {
          setUser(match);
        } else {
          setUser(null); // not found on server anymore
        }
      })
      .catch((err) => {
        setError("Error fetching profile: " + err.message);
      });
  }, []);

  if (user === undefined) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (user === null) return <p>No user logged in.</p>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>

      <button
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
