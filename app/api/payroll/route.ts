import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instructorId = searchParams.get('instructorId');
  
  const payroll = await query(`
    SELECT 
      PeriodStart, 
      PeriodEnd, 
      TotalEarnings 
    FROM Payroll 
    WHERE InstructorID = $1
  `, [instructorId]);
  
  return new Response(JSON.stringify(payroll));
}
