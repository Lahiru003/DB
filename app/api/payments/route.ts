// 7. app/api/payments/route.ts (Payments API)
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const { ClientID, Amount, PaymentDate, Method } = await request.json();
  
  const payment = await query<{ PaymentID: number }>(`
    INSERT INTO Payments (
      ClientID, Amount, PaymentDate, Method
    ) VALUES ($1, $2, $3, $4)
    RETURNING PaymentID
  `, [ClientID, Amount, PaymentDate, Method]);
  
  return new Response(JSON.stringify({ PaymentID: payment[0].PaymentID })); // Accessing the result directly
}
