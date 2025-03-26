"use client";
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export function NewClientForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    instrumentPreference: '',
    familyGroupId: '' // Keep this as an empty string initially
  });

  const { data: familyGroups } = useSWR('/api/family-groups');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation to check if required fields are filled out
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send null for FamilyGroupID if not selected
    const dataToSend = {
      ...formData,
      familyGroupId: formData.familyGroupId || null // If empty string, set it to null
    };

    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });

    mutate('/api/clients');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={e => setFormData({ ...formData, phone: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Instrument Preference"
        value={formData.instrumentPreference}
        onChange={e => setFormData({ ...formData, instrumentPreference: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={formData.familyGroupId}
        onChange={e => setFormData({ ...formData, familyGroupId: e.target.value })}
        className="p-3 border border-gray-700 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Family Group</option>
        {familyGroups?.map((group: any) => (
          <option key={group.familygroupid} value={group.familygroupid}>
            {group.groupname}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Client
      </button>
    </form>
  );
}
