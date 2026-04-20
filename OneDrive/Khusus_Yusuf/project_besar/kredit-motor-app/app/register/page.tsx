"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [nama_pelanggan, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_pelanggan, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Register berhasil");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold">Register</h1>

      <input
        placeholder="Nama"
        value={nama_pelanggan}
        onChange={(e) => setNama(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleRegister}
        className="bg-green-500 text-white p-2"
      >
        Register
      </button>
    </div>
  );
}