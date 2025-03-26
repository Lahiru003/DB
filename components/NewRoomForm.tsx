"use client"
import { useState } from 'react'
import { fetcher } from '@/lib/fetcher'
import useSWR, { mutate } from 'swr'

export const NewRoomForm = () => {
  const [formData, setFormData] = useState({
    roomName: '',
    capacity: 1,
    instrumentAvailable: '',
    roomType: 'Individual'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    mutate('/api/rooms')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Room Name"
        value={formData.roomName}
        onChange={e => setFormData({ ...formData, roomName: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Instruments Available"
        value={formData.instrumentAvailable}
        onChange={e => setFormData({ ...formData, instrumentAvailable: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={formData.roomType}
        onChange={e => setFormData({ ...formData, roomType: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="Individual">Individual</option>
        <option value="Group">Group</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Room
      </button>
    </form>
  )
}
