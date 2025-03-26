"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the interface for an instructor
interface Instructor {
  InstructorID: number;
  FirstName: string;
  LastName: string;
  Email: string;
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    axios.get('/api/instructors').then(res => setInstructors(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/instructors`, { data: { InstructorID: id } });
    setInstructors(prev => prev.filter(i => i.InstructorID !== id));
  };

  return (
    <div className="min-h-screen p-8 pb-20">
      <h1 className="text-3xl font-bold text-center mb-8">Instructor Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map(i => (
            <tr key={i.InstructorID} className="border-t">
              <td className="px-4 py-2">{i.FirstName} {i.LastName}</td>
              <td className="px-4 py-2">{i.Email}</td>
              <td className="px-4 py-2">
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(i.InstructorID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
