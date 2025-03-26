// app/api/family-groups/route.ts
import { query } from '@/lib/db'; // Database helper function

// Get all family groups
export async function GET() {
  const familyGroups = await query(`
    SELECT 
      FamilyGroupID, 
      GroupName 
    FROM FamilyGroups
  `);
  return new Response(JSON.stringify(familyGroups), { status: 200 });
}

// Add a new family group
export async function POST(request: Request) {
  const { groupName } = await request.json();

  await query(`
    INSERT INTO FamilyGroups (GroupName)
    VALUES ($1)
  `, [groupName]);

  return new Response(JSON.stringify({ message: 'Family group added' }), { status: 201 });
}

// Delete a family group
export async function DELETE(request: Request) {
  try {
    const { FamilyGroupID } = await request.json();

    if (!FamilyGroupID) {
      return new Response(JSON.stringify({ error: "Family Group ID is required" }), { status: 400 });
    }

    await query('DELETE FROM FamilyGroups WHERE FamilyGroupID = $1', [FamilyGroupID]);

    return new Response(JSON.stringify({ message: 'Family group deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete family group' }), { status: 500 });
  }
}
