"use client"
import { PayrollChart } from "@/components/PayrollChart";
import { PayrollTable } from "@/components/PayrollTable";

export default function PayrollPage() {
  return (
    <div className="page-container">
      <h2 className="section-title">Payroll Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <PayrollTable />
        </div>
        <div className="card">
          <PayrollChart />
        </div>
      </div>
    </div>
  );
}
