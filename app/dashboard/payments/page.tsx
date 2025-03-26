"use client"
import { PaymentTable } from "@/components/PaymentTable";

export default function PaymentsPage() {
  return (
    <div className="page-container">
      <h2 className="section-title">Payment Tracking</h2>
      <div className="card">
        <PaymentTable />
      </div>
    </div>
  );
}
