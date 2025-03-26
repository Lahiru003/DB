import { query } from '@/lib/db';

// Get all instructors
export async function GET() {
  const instructors = await query(`
    SELECT 
      InstructorID, 
      FirstName, 
      LastName, 
      Email, 
      Phone, 
      Skillset 
    FROM Instructors
  `);
  return new Response(JSON.stringify(instructors), { status: 200 });
}

// Add a new instructor
export async function POST(request: Request) {
  const { firstName, lastName, email, phone, skillset, maxHoursWeekly, password } = await request.json();

  await query(`
    INSERT INTO Instructors (FirstName, LastName, Email, Phone, Skillset, MaxHoursWeekly, Password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [firstName, lastName, email, phone, skillset, maxHoursWeekly, password]);

  return new Response(JSON.stringify({ message: 'Instructor added' }), { status: 201 });
}

// Delete an instructor
export async function DELETE(request: Request) {
  try {
    const { InstructorID } = await request.json();

    if (!InstructorID) {
      return new Response(JSON.stringify({ error: "Instructor ID is required" }), { status: 400 });
    }

    await query('DELETE FROM Instructors WHERE InstructorID = $1', [InstructorID]);

    return new Response(JSON.stringify({ message: 'Instructor deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete instructor' }), { status: 500 });
  }
}
