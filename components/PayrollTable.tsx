"use client"
import useSWR from 'swr';

export function PayrollTable() {
  const { data: payroll } = useSWR('/api/payroll');

  return (
    <table className="min-w-full divide-y divide-gray-700 text-white bg-gray-800">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-900 text-left text-xs font-medium text-gray-400">Period</th>
          <th className="px-6 py-3 bg-gray-900 text-left text-xs font-medium text-gray-400">Classes</th>
          <th className="px-6 py-3 bg-gray-900 text-left text-xs font-medium text-gray-400">Earnings</th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-700">
        {payroll?.map((entry: any) => (
          <tr key={entry.payrollid}>
            <td className="px-6 py-4">{new Date(entry.periodstart).toLocaleDateString()} - {new Date(entry.periodend).toLocaleDateString()}</td>
            <td className="px-6 py-4">{entry.totalclasses}</td>
            <td className="px-6 py-4">${entry.totalearnings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
