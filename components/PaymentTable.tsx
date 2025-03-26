"use client"
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

interface Payment {
  paymentid: number
  clientid: number
  amount: number
  paymentdate: string
  method: string
  status: string
  clientfirstname?: string
  clientlastname?: string
}

export function PaymentTable() {
  const { data: payments } = useSWR<Payment[]>('/api/payments', fetcher)

  return (
    <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-700 text-white">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {payments?.map((payment) => (
            <tr key={payment.paymentid}>
              <td className="px-6 py-4 whitespace-nowrap">
                {payment.clientfirstname} {payment.clientlastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(payment.paymentdate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-blue-700 text-blue-200 rounded-full text-sm">
                  {payment.method}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  payment.status === 'Completed' 
                    ? 'bg-green-700 text-green-200' 
                    : 'bg-yellow-700 text-yellow-200'
                }`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
