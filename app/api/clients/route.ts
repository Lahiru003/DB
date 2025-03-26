import { query } from '@/lib/db';

export async function GET() {
  const clients = await query(`
    SELECT c.*, f.GroupName 
    FROM Clients c
    LEFT JOIN FamilyGroups f ON c.FamilyGroupID = f.FamilyGroupID
  `);
  return new Response(JSON.stringify(clients));
}

export async function POST(request: Request) {
  const { firstName, lastName, phone, email, instrumentPreference, familyGroupId } = await request.json();

  // Handle the case where familyGroupId might be null
  const result = await query(`
    INSERT INTO Clients 
    (FirstName, LastName, Phone, Email, InstrumentPreference, FamilyGroupID)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING ClientID
  `, [firstName, lastName, phone, email, instrumentPreference, familyGroupId]);

  return new Response(JSON.stringify(result[0]));
}
