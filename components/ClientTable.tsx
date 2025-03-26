"use client";

import useSWR from 'swr';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ClientTable() {
  const { data: clients, error, isLoading } = useSWR('/api/clients', fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <p className="text-xl text-red-600">Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-gray-800 p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrument</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Group</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-600">
          {clients?.map((client: any) => (
            <tr key={client.clientid}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{client.firstname} {client.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-400">{client.email}<br />{client.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{client.instrumentpreference}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{client.groupname || 'Individual'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
