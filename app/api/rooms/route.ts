// /app/api/rooms/route.ts

import { query } from '@/lib/db';

// GET method to fetch rooms (if needed)
export async function GET() {
  const rooms = await query(`
    SELECT RoomID, RoomName, Capacity, InstrumentAvailable, RoomType
    FROM Rooms
  `);
  return new Response(JSON.stringify(rooms));
}

// POST method to add a new room
export async function POST(request: Request) {
  const { roomName, capacity, instrumentAvailable, roomType } = await request.json();

  // Insert the new room into the database
  await query(`
    INSERT INTO Rooms (RoomName, Capacity, InstrumentAvailable, RoomType)
    VALUES ($1, $2, $3, $4)
  `, [roomName, capacity, instrumentAvailable, roomType]);

  return new Response('Room added successfully', { status: 201 });
}
