"use client"
import { ClientTable } from "@/components/ClientTable";
import { NewClientForm } from "@/components/NewClientForm";

export default function ClientsPage() {
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Client Management</h2>
        <NewClientForm />
      </div>
      <div className="card">
        <ClientTable />
      </div>
    </div>
  );
}
