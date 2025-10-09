'use client';
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // tambahkan state loading

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false); // ubah jadi false setelah data datang
      })
      .catch(() => setLoading(false)); // kalau error, tetap matikan loading
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading data...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar User</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
