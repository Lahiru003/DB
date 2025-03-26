// /components/NewInstructorForm.tsx

"use client";
import { useState } from 'react';
import { mutate } from 'swr';  // Add this import

export const NewInstructorForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skillset, setSkillset] = useState('');
  const [maxHoursWeekly, setMaxHoursWeekly] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/instructors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        skillset,
        maxHoursWeekly,
        password,
      }),
    });

    if (response.ok) {
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSkillset('');
      setMaxHoursWeekly('');
      setPassword('');
      // Optionally, refetch the list of instructors
      mutate('/api/instructors');  // This will trigger a re-fetch for the instructor data
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={skillset}
        onChange={(e) => setSkillset(e.target.value)}
        placeholder="Skillset"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="number"
        value={maxHoursWeekly}
        onChange={(e) => setMaxHoursWeekly(e.target.value)}
        placeholder="Max Hours Weekly"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
        Add Instructor
      </button>
    </form>
  );
};
