"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Email & password wajib diisi");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Response bukan JSON");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // simpan token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔥 redirect berdasarkan role
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "marketing") {
        router.push("/marketing");
      } else if (data.role === "ceo") {
        router.push("/ceo");
      } else {
        router.push("/");
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-500 text-sm">
            Masuk ke akun kamu
          </p>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}