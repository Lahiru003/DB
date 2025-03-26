"use client"
import { RoomGrid } from "@/components/RoomGrid";
import { NewRoomForm } from "@/components/NewRoomForm";

export default function RoomsPage() {
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Room Management</h2>
        <NewRoomForm />
      </div>
      <div className="card">
        <RoomGrid />
      </div>
    </div>
  );
}
