// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";  // Ensure the correct path to your auth logic

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();
    const token = await authenticate(email, password, role);

    if (token) {
      const response = NextResponse.json({ token });
      response.cookies.set({
        name: 'authToken',
        value: token,
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'lax'
      });
      return response;
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in authentication API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}