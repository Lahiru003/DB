// app/api/lesson-types/route.ts
import { query } from '@/lib/db'; // Database helper function

// Get all lesson types
export async function GET() {
  const lessonTypes = await query(`
    SELECT 
      LessonTypeID, 
      LessonName, 
      Duration 
    FROM LessonTypes
  `);
  return new Response(JSON.stringify(lessonTypes), { status: 200 });
}

// Add a new lesson type
export async function POST(request: Request) {
  const { lessonName, duration } = await request.json();

  await query(`
    INSERT INTO LessonTypes (LessonName, Duration)
    VALUES ($1, $2)
  `, [lessonName, duration]);

  return new Response(JSON.stringify({ message: 'Lesson type added' }), { status: 201 });
}

// Delete a lesson type
export async function DELETE(request: Request) {
  try {
    const { LessonTypeID } = await request.json();

    if (!LessonTypeID) {
      return new Response(JSON.stringify({ error: "Lesson Type ID is required" }), { status: 400 });
    }

    await query('DELETE FROM LessonTypes WHERE LessonTypeID = $1', [LessonTypeID]);

    return new Response(JSON.stringify({ message: 'Lesson type deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete lesson type' }), { status: 500 });
  }
}
