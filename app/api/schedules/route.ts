import { query } from '@/lib/db';

// Get schedules
export async function GET() {
  try {
    const schedules = await query<{
      ScheduleID: number;
      clientFirstName: string;
      instructorFirstName: string;
      LessonName: string;
      StartDateTime: string;
      Status: string;
    }>(`
      SELECT 
        s.ScheduleID,
        c.FirstName AS clientFirstName,
        i.FirstName AS instructorFirstName,
        lt.LessonName,
        s.StartDateTime,
        s.Status
      FROM Schedules s
      JOIN Clients c ON s.ClientID = c.ClientID
      JOIN Instructors i ON s.InstructorID = i.InstructorID
      JOIN LessonTypes lt ON s.LessonTypeID = lt.LessonTypeID
    `);

    return new Response(JSON.stringify(schedules), { status: 200 });  // Return schedules as JSON
  } catch (error: any) {
    // Error handling for GET
    return new Response(
      JSON.stringify({ error: 'Failed to fetch schedules', details: error.message }),
      { status: 500 }
    );
  }
}

// Create a new schedule
export async function POST(request: Request) {
  const { 
    ClientID, 
    InstructorID, 
    RoomID, 
    LessonTypeID, 
    StartDateTime, 
    EndDateTime 
  } = await request.json();

  // Validate the required fields
  if (!ClientID || !InstructorID || !RoomID || !LessonTypeID || !StartDateTime || !EndDateTime) {
    return new Response(
      JSON.stringify({ error: 'All fields are required: ClientID, InstructorID, RoomID, LessonTypeID, StartDateTime, EndDateTime' }),
      { status: 400 }
    );
  }

  try {
    // Insert new schedule into the database
    const result = await query<{ ScheduleID: number }>(`
      INSERT INTO Schedules (
        ClientID, InstructorID, RoomID, LessonTypeID, 
        StartDateTime, EndDateTime
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING ScheduleID
    `, [
      ClientID, InstructorID, RoomID, LessonTypeID,
      StartDateTime, EndDateTime
    ]);

    // Return the newly created schedule ID
    return new Response(JSON.stringify({ ScheduleID: result[0].ScheduleID }), { status: 201 });
  } catch (error: any) {
    // Handle any errors that occur during the insertion
    return new Response(
      JSON.stringify({ error: 'Failed to create schedule', details: error.message }),
      { status: 500 }
    );
  }
}
