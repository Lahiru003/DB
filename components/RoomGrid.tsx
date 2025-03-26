"use client"
import useSWR from 'swr';

export function RoomGrid() {
  const { data: rooms } = useSWR('/api/rooms');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms?.map((room: any) => (
        <div key={room.roomid} className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
          <h3 className="font-bold text-lg">{room.roomname}</h3>
          <p>Type: {room.roomtype}</p>
          <p>Capacity: {room.capacity}</p>
          <p>Instruments: {room.instrumentavailable}</p>
        </div>
      ))}
    </div>
  );
}
