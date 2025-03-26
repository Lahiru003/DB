"use client"
import { useState } from 'react';
import useSWR from 'swr';

// Custom fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function ScheduleForm() {
  const [formData, setFormData] = useState({
    clientId: '',
    instructorId: '',
    roomId: '',
    lessonTypeId: '',
    startDateTime: '',
    endDateTime: '',
    isRecurring: true
  });

  // Fetch data with SWR
  const { data: clients, error: clientsError } = useSWR('/api/clients', fetcher);
  const { data: instructors, error: instructorsError } = useSWR('/api/instructors', fetcher);
  const { data: rooms, error: roomsError } = useSWR('/api/rooms', fetcher);
  const { data: lessonTypes, error: lessonTypesError } = useSWR('/api/lesson-types', fetcher);

  // Handle errors during fetch
  if (clientsError || instructorsError || roomsError || lessonTypesError) {
    return <div>Error loading data...</div>;
  }

  // Handle loading state
  if (!clients || !instructors || !rooms || !lessonTypes) {
    return <div>Loading...</div>;
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Select */}
        <select 
          value={formData.clientId}
          onChange={e => setFormData({...formData, clientId: e.target.value})}
          className="p-2 border rounded"
        >
          <option value="">Select Client</option>
          {clients?.map((client: any) => (
            <option key={client.clientid} value={client.clientid}>
              {client.firstname} {client.lastname}
            </option>
          ))}
        </select>

        {/* Instructor Select */}
        <select 
          value={formData.instructorId}
          onChange={e => setFormData({...formData, instructorId: e.target.value})}
          className="p-2 border rounded"
        >
          <option value="">Select Instructor</option>
          {instructors?.map((instructor: any) => (
            <option key={instructor.instructorid} value={instructor.instructorid}>
              {instructor.firstname} {instructor.lastname}
            </option>
          ))}
        </select>

        {/* Room Select */}
        <select 
          value={formData.roomId}
          onChange={e => setFormData({...formData, roomId: e.target.value})}
          className="p-2 border rounded"
        >
          <option value="">Select Room</option>
          {rooms?.map((room: any) => (
            <option key={room.roomid} value={room.roomid}>
              {room.roomname} ({room.roomtype})
            </option>
          ))}
        </select>

        {/* Lesson Type Select */}
        <select 
          value={formData.lessonTypeId}
          onChange={e => setFormData({...formData, lessonTypeId: e.target.value})}
          className="p-2 border rounded"
        >
          <option value="">Select Lesson Type</option>
          {lessonTypes?.map((type: any) => (
            <option key={type.lessontypeid} value={type.lessontypeid}>
              {type.lessonname} ({type.duration} mins)
            </option>
          ))}
        </select>

        {/* Start Date Time */}
        <input 
          type="datetime-local"
          value={formData.startDateTime}
          onChange={e => setFormData({...formData, startDateTime: e.target.value})}
          className="p-2 border rounded"
        />

        {/* End Date Time */}
        <input 
          type="datetime-local"
          value={formData.endDateTime}
          onChange={e => setFormData({...formData, endDateTime: e.target.value})}
          className="p-2 border rounded"
        />

        {/* Recurring Lesson Checkbox */}
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox"
            checked={formData.isRecurring}
            onChange={e => setFormData({...formData, isRecurring: e.target.checked})}
          />
          <span>Recurring Lesson</span>
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Schedule Lesson
      </button>
    </form>
  );
}
