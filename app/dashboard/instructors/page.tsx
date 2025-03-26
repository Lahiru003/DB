"use client"; // Ensure this runs on the client side

import useSWR, { mutate } from 'swr';
import { NewInstructorForm } from '@/components/NewInstructorForm';
import { InstructorCard } from '@/components/InstructorCard';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch instructors");
  }
  return res.json();
};

export default function InstructorsPage() {
  const { data: instructors, error } = useSWR('/api/instructors', fetcher);

  console.log('Instructors:', instructors);
  console.log('Error:', error);
  const handleDelete = async (instructorId: number) => {
    console.log(`Attempting to delete instructor ID: ${instructorId}`);
  
    try {
      const response = await fetch(`/api/instructors`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // Ensure the key matches the backend expected key: "InstructorID"
        body: JSON.stringify({ InstructorID: instructorId }),
      });
  
      const result = await response.json();
      console.log('Delete Response:', result);
  
      if (!response.ok) {
        console.error('Delete failed:', result.error);
        return;
      }
  
      mutate('/api/instructors'); // Refresh instructor list
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };
  

  if (error) return <div>Error loading instructors: {error.message}</div>;
  if (!instructors) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Instructor Management</h2>
        <NewInstructorForm />
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Skillset</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-white">
            {instructors.map((instructor: any) => (
              <tr key={instructor.instructorid}>
                <td className="px-4 py-2">{instructor.firstname}</td>
                <td className="px-4 py-2">{instructor.lastname}</td>
                <td className="px-4 py-2">{instructor.email}</td>
                <td className="px-4 py-2">{instructor.phone}</td>
                <td className="px-4 py-2">{instructor.skillset}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(instructor.instructorid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-grid mt-6">
        {instructors.map((instructor: any) => (
          <InstructorCard key={instructor.instructorid} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}
