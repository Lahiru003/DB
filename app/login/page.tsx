"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("mrsbarnes@musicdepo.com"); // Editable email
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [error, setError] = useState("");
  const router = useRouter();  // Router initialization
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', { 
        email, 
        password, 
        role 
      }, {
        withCredentials: true // Ensure cookies are received
      });
  
      if (response.data.token) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">The Music Depo</h1>
      <div className="max-w-md w-full p-6 bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-300">
              Role:
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-md"
              placeholder="Enter your role"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
