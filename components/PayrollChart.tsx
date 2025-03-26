"use client"
import useSWR from 'swr';

export function PayrollChart() {
  const { data: payroll } = useSWR('/api/payroll');

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Payroll Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {payroll?.map((entry: any) => (
          <div key={entry.payrollid} className="bg-gray-900 p-3 rounded text-white">
            <p className="font-medium">{entry.periodstart} - {entry.periodend}</p>
            <p>Total Earnings: ${entry.totalearnings}</p>
            <div className="w-full bg-gray-700 rounded h-2 mt-2">
              <div 
                className="bg-blue-500 rounded h-2" 
                style={{ width: `${Math.min(entry.totalclasses * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
